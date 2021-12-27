import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Segment, Icon, Breadcrumb, Image} from 'semantic-ui-react'
import SongPlayer from '../components/songplayer'
import { Disqus } from 'gatsby-plugin-disqus';
import SharingModule from '../components/share'

export default function Recording({ data }) {
    const title = `Listening to '${data.airtable.data.SongTitle}' from '${data.airtable.data.Singer}'`
    const currentUrl = data.site.siteMetadata.siteUrl + '/recording/' + data.airtable.fields.slug
    console.log(currentUrl)
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
query GetRecording($recordId: String!){
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
    site {
        siteMetadata {
          siteUrl
        }
      }
}`