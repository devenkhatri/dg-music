import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Segment, Icon, Breadcrumb, Image } from 'semantic-ui-react'
import SongPlayer from '../components/songplayer'
import { Disqus } from 'gatsby-plugin-disqus';
import SharingModule from '../components/share'

export default function Recording({ data }) {
  const title = `Listening to '${data.airtable.data.SongTitle}' from '${data.airtable.data.Singer}'`
  const currentUrl = data.site.siteMetadata.siteUrl + '/recording/' + data.airtable.fields.slug
  const { previous, next } = data
  return (
    <Layout>
      <SEO
        title={title}
        image={data.airtable.data.CoverImage && data.airtable.data.CoverImage.localFiles && data.airtable.data.CoverImage.localFiles[0].childImageSharp.fluid.src}
      />
      <Header as='h1' icon textAlign='center'>
        <Icon name='sound' circular inverted color="blue" />
        <Header.Content>{title}</Header.Content>
        <SharingModule shareUrl={currentUrl} title={title} />        
      </Header>
      <Breadcrumb>
        <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon='right angle' />
        <Breadcrumb.Section active>{data.airtable.data.SongTitle}</Breadcrumb.Section>
      </Breadcrumb>
      <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              fontSize: '1.5rem'
            }}
          >
            <li style={{padding: '1rem 0'}}>
              {previous && (
                <Link to={`/recording/${previous.fields.slug}`} rel="prev">
                  ← {previous.data.SongTitle}
                </Link>
              )}
            </li>
            <li style={{padding: '1rem 0'}}>
              {next && (
                <Link to={`/recording/${next.fields.slug}`} rel="next">
                  {next.data.SongTitle} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      <Segment inverted>
        <SongPlayer src={data.airtable.data.MediaFile && data.airtable.data.MediaFile[0] && data.airtable.data.MediaFile[0].url} isAutoPlay={true} layout="stacked-reverse" />
        <Image
          src={data.airtable.data.CoverImage && data.airtable.data.CoverImage.localFiles && data.airtable.data.CoverImage.localFiles[0].childImageSharp.fluid.src} fluid
        />
      </Segment>
      <Disqus
        identifier={data.airtable.recordId}
        title={title}
        url={currentUrl}
      />
      <div id="disqus_recommendations"></div>
    </Layout>
  )
}

export const query = graphql`
query GetRecording(
      $recordId: String!
      $previousId: String
      $nextId: String
    ){
    airtable(recordId: { eq: $recordId}) {
        id
        table
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
    previous: airtable(id: { eq: $previousId }) {
      fields {
        slug
      }
      data {
        SongTitle
      }
    }
    next: airtable(id: { eq: $nextId }) {
      fields {
        slug
      }
      data {
        SongTitle
      }
    }
    site {
        siteMetadata {
          siteUrl
        }
      }
}`