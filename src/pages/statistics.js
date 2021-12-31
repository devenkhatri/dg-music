import React, { useEffect, useState } from "react";
import { Header, Statistic, Icon, Segment, Container, Table, Label } from 'semantic-ui-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useGlobal } from '../globalstore';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Moment from 'react-moment';

const SongStatistics = ({ data }) => {
  let allRecordings = (data.allRecordings && data.allRecordings.group) || []
  allRecordings = _.orderBy(allRecordings, ['fieldValue'], ['desc'])

  const [globalState, globalActions] = useGlobal();
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (globalState.playCounts && globalState.playCounts.length <= 0) {
      globalActions.getPlayCountsAirtable().then(() => {
        initialize();
      });
    } else {
      initialize();
    }
  }, [grandTotal]);

  const initialize = () => {
    let total = 0;
    globalState.playCounts && globalState.playCounts.map((item) => {
      total += item.count;
    })
    setGrandTotal(total)
  }


  return (
    <Layout>
      <SEO title="Statistics" />
      <Header as='h1' icon textAlign='center'>
        <Icon name='chart bar' circular inverted color="blue" />
        <Header.Content>Songs Statistics</Header.Content>
      </Header>
      <Container textAlign="center">
        <Segment placeholder>
          <Statistic color='blue' size='huge'>
            <Statistic.Value>{grandTotal}</Statistic.Value>
            <Statistic.Label style={{ paddingTop: '1rem' }}>Total times songs played</Statistic.Label>
          </Statistic>
        </Segment>
        <Label size="massive" color="blue">
          No. of times Individual Songs played
        </Label>
        <Table color="blue" size="large" stackable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Song Title</Table.HeaderCell>
              {/* <Table.HeaderCell>Recording Date</Table.HeaderCell> */}
              <Table.HeaderCell textAlign='left'>No of time played</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allRecordings && allRecordings.map((item) => (
              <>
                <Table.Row>
                  <Table.Cell colSpan="3" warning textAlign="center">
                    <Moment format="MMM DD, YYYY">
                      {item.fieldValue}
                    </Moment>
                  </Table.Cell>
                </Table.Row>
                {item.edges.map(({ node }) => (
                  <Table.Row key={node.recordId}>
                    <Table.Cell>{node.data.SongTitle}</Table.Cell>
                    {/* <Table.Cell>{node.data.RecordingDate}</Table.Cell> */}
                    <Table.Cell textAlign='left'>
                      <Icon name='music' />
                      {globalActions.getPlayCount(node.recordId)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ))}

          </Table.Body>
        </Table>
      </Container>
    </Layout>
  );
}

export default SongStatistics;

export const query = graphql`
query {
  allRecordings: allAirtable(
    filter: {table: {eq: "Recordings"}}
    sort: {fields: data___SongTitle}
  ) {
    group(field: data___RecordingDate) {
      fieldValue
      edges {
        node {
          recordId
          fields {
            slug
          }
          data {
            SongTitle
            RecordingDate(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
}
`;