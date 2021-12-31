import React, { useEffect, useState } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Card, Icon, Image, Label, Menu } from 'semantic-ui-react'
import { graphql } from 'gatsby';
import SongPlayer from '../components/songplayer';
import { useGlobal } from '../globalstore';
import _ from 'lodash';
import Moment from 'react-moment';


export default function Home({ data }) {
  let allRecordings = (data.allRecordings && data.allRecordings.group) || []
  allRecordings = _.orderBy(allRecordings, ['fieldValue'], ['desc'])

  const [globalState, globalActions] = useGlobal();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setReload(1)
    globalActions.getPlayCountsAirtable();
  }, [reload]);
  return (
    <Layout>
      <SEO title="Recordings" />
      <Header as='h1' icon textAlign='center'>
        <Icon name='soundcloud' circular inverted color="blue" />
        <Header.Content>List of Recordings</Header.Content>
      </Header>

      {allRecordings && allRecordings.map((item) => (
        <>
          <Header>
            <Menu compact>
              <Menu.Item as='a'>
                <Icon name='calendar' />
                <Moment format="MMM DD, YYYY">
                  {item.fieldValue}
                </Moment>
                <Label color='blue' floating circular>
                  {item.edges.length}
                </Label>
              </Menu.Item>
            </Menu>
          </Header>
          {/* <Label ribbon as="a" color="blue" style={{padding: '1rem', margin: '2rem 0 0 1rem'}}>
            <Moment format="MMM DD, YYYY">
              {item.fieldValue}
            </Moment>
          </Label> */}
          <Card.Group itemsPerRow={3} stackable>
            {item.edges.map(({ node }) => (
              <Card key={node.recordId}>
                <a href={`/recording/${node.fields.slug}`}>
                  <Image
                    src={node.data.CoverImage && node.data.CoverImage.localFiles && node.data.CoverImage.localFiles[0].childImageSharp.fluid.src} fluid
                    style={{ height: '13rem', objectFit: 'cover' }}
                  />
                </a>
                <Card.Content>
                  <Card.Header as="a" href={`/recording/${node.fields.slug}`}>{node.data.SongTitle}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{node.data.RecordingDate}</span>
                  </Card.Meta>
                  <Card.Description>
                    <SongPlayer src={node.data.MediaFile && node.data.MediaFile[0] && node.data.MediaFile[0].url} isAutoPlay={false} layout="stacked-reverse" recordId={node.recordId} />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='play' />
                  {globalActions.getPlayCount(node.recordId)}
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </>
      ))}
      <div id="disqus_recommendations"></div>
    </Layout>
  );
}

export const query = graphql`
query {
  allRecordings: allAirtable(
    sort: {fields: data___SongTitle}
    filter: {table: {eq: "Recordings"}}
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
}
`;