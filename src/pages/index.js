import React, { useState } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Card, Icon, Image } from 'semantic-ui-react'
import { graphql } from 'gatsby';
import SongPlayer from '../components/songplayer';
import { useGlobal } from '../globalstore';

export default function Home({ data }) {
  const allRecordings = (data.allRecordings && data.allRecordings.edges) || []
  const [globalState, globalActions] = useGlobal();
  console.log("***** globalState",globalState)
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
              {/* <Image
                src={node.data.CoverImage && node.data.CoverImage.localFiles && node.data.CoverImage.localFiles[0].childImageSharp.fluid.src} fluid
                style={{ height: '13rem', objectFit: 'cover' }}
              /> */}
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
                {node.data.Plays} - {globalActions.getPlayCount(node.recordId)} = {globalState.counter}
                <button type="button" onClick={() => globalActions.addToCounter(1)}>
                  +1 to global
                </button>
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