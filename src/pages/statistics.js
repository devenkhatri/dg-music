import React, { useEffect, useState } from "react";
import { Header, Statistic, Icon, Segment, Container, Table, Label } from 'semantic-ui-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useGlobal } from '../globalstore';
import { graphql } from 'gatsby';

const SongStatistics = ({ data }) => {
    const allRecordings = (data.allRecordings && data.allRecordings.edges) || []
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
            <SEO title="Recordings" />
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
                    No. of times Songs played
                </Label>
                <Table color="blue" size="large" stackable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Song Title</Table.HeaderCell>
                            <Table.HeaderCell>Song Date</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>No of time played</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {allRecordings && allRecordings.map(({ node }) => (
                            <Table.Row key={node.recordId}>
                                <Table.Cell>{node.data.SongTitle}</Table.Cell>
                                <Table.Cell>{node.data.RecordingDate}</Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Icon name='music' />
                                    {globalActions.getPlayCount(node.recordId)}
                                </Table.Cell>
                            </Table.Row>
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
    sort: {fields: data___RecordingDate, order: DESC}
    filter: {table: {eq: "Recordings"}}
  ) {
    edges {
      node {
        recordId
        fields {
          slug
        }
        data {
          SongTitle
          Singer
          Plays
          RecordingDate(formatString: "MMM DD, YYYY")
          MediaFile {
            url
          }
          CoverImage {
            localFiles {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
}
`;