import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Card, Icon, Image } from 'semantic-ui-react'
import { graphql } from 'gatsby';
import SongPlayer from '../components/songplayer';

export default function Home({ data }) {
  const allRecordings = (data.allRecordings && data.allRecordings.edges) || []
  return (
    <Layout>
      <SEO title="Recordings" />
      <Header as='h1' icon textAlign='center'>
        <Icon name='soundcloud' circular inverted color="blue" />
        <Header.Content>List of Recordings</Header.Content>
      </Header>
      <Card.Group doubling itemsPerRow={3} stackable>
        {allRecordings.map(({ node }) => (
          <Card key={node.recordId}>
            <a href={`/recording/${node.fields.slug}`}>
              <Image
                src={node.data.CoverImage && node.data.CoverImage[0] && node.data.CoverImage[0].url} fluid
                style={{ height: '13rem', objectFit: 'cover' }}
              />
            </a>
            <Card.Content>
              <Card.Header as="a" href={`/recording/${node.fields.slug}`}>{node.data.SongTitle}</Card.Header>
              <Card.Meta>
                <span className='date'>{node.data.RecordingDate}</span>
              </Card.Meta>
              <Card.Description>
                <SongPlayer src={node.data.MediaFile && node.data.MediaFile[0] && node.data.MediaFile[0].url} isAutoPlay={false} layout="stacked-reverse" />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {node.data.Singer}
              </a>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <div id="disqus_recommendations"></div>
    </Layout>
  );
}

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
          RecordingDate(formatString: "MMM DD, YYYY")
          MediaFile {
            url
          }
          CoverImage {
            url
          }
        }
      }
    }
  }
}
`;