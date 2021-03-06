import React, { Fragment, useEffect, useState } from "react";
import { Header, Statistic, Icon, Segment, Container, Table, Label, Grid, Divider, Menu } from 'semantic-ui-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useGlobal } from '../globalstore';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import Moment from 'react-moment';
import SongPlayer from "../components/songplayer";

const SongStatistics = ({ data }) => {
  let allRecordings = (data.allRecordings && data.allRecordings.group) || []
  allRecordings = _.orderBy(allRecordings, ['fieldValue'], ['desc'])

  //get all the songs into a playlist
  let totalSongs = 0;
  const playList = [];
  allRecordings && allRecordings.map((item) => {
    totalSongs += item.edges.length;
    item.edges.map(({ node }) => {
      playList.push({
        name: node.data.SongTitle,
        singer: node.data.Singer,
        cover: node.data.CoverImage && node.data.CoverImage.localFiles && node.data.CoverImage.localFiles[0].childImageSharp.fluid.src,
        musicSrc: node.data.MediaFile && node.data.MediaFile[0] && node.data.MediaFile[0].url,
        recordId: node.recordId,
      })
    })
  })

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
    <>
      <Menu fixed='bottom' inverted>
        <div style={{ width: '100%' }}>
          <SongPlayer playList={playList} playIndex={0} autoPlay />
        </div>
      </Menu>

      <Layout>
        <SEO title="Statistics" />
        <Header as='h1' icon textAlign='center'>
          <Icon name='chart bar' circular inverted color="blue" />
          <Header.Content>Songs Statistics</Header.Content>
        </Header>
        <Container textAlign="center">
          <Grid columns={2} divided relaxed stackable>
            <Grid.Row>
              <Grid.Column>
                <Segment placeholder>
                  <Statistic color='blue' size='huge'>
                    <Statistic.Value>{totalSongs}</Statistic.Value>
                    <Statistic.Label style={{ paddingTop: '1rem' }}>Total songs</Statistic.Label>
                  </Statistic>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment placeholder>
                  <Statistic color='blue' size='huge'>
                    <Statistic.Value>{grandTotal}</Statistic.Value>
                    <Statistic.Label style={{ paddingTop: '1rem' }}>Total times songs played</Statistic.Label>
                  </Statistic>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Label size="massive" color="blue">
            No. of times Individual Songs played
          </Label>
          <Table color="blue" size="large" stackable compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Song Title</Table.HeaderCell>
                <Table.HeaderCell textAlign='left'>No of time played</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {allRecordings && allRecordings.map((item) => (
                <Fragment key={item.fieldValue}>
                  <Table.Row>
                    <Table.Cell colSpan="3" warning textAlign="center">
                      <Moment format="MMM DD, YYYY">
                        {item.fieldValue}
                      </Moment>
                    </Table.Cell>
                  </Table.Row>
                  {item.edges.map(({ node }) => (
                    <Table.Row key={node.recordId}>
                      <Table.Cell>
                        <Link to={`/recording/${node.fields.slug}`}>
                          {node.data.SongTitle}
                        </Link>
                      </Table.Cell>
                      <Table.Cell textAlign='left'>
                        <Icon name='music' />
                        {globalActions.getPlayCount(node.recordId)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Fragment>
              ))}

            </Table.Body>
          </Table>
        </Container>
      </Layout>
    </>
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
}
`;