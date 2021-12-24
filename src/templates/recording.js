import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Segment, Icon, Placeholder } from 'semantic-ui-react'


export default function Recording({ data }) {

    return (
        <Layout>
            <SEO title="Detail" />
            <Header as='h1' icon textAlign='center'>
                <Icon name='sound' circular inverted color="blue" />
                <Header.Content>Details of Songs</Header.Content>
            </Header>
            <Segment padded='very'>
                {data.airtable.data.SongTitle}
            </Segment>
        </Layout>
    )
}

export const query = graphql`
query GetRecording($recordId: String!){
    airtable(recordId: { eq: $recordId}) {
        id
        table
        recordId
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
}`