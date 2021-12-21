import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Segment, Icon, Placeholder } from 'semantic-ui-react'
import _ from 'lodash';

export default function Details() {
  return (
    <Layout>
      <SEO title="Detail" />
      <Header as='h1' icon textAlign='center'>
        <Icon name='sound' circular inverted color="blue" />
        <Header.Content>Details of Songs</Header.Content>
      </Header>
      <Segment.Group raised padded>
        {_.times(5, (i) => (
          <Segment padded='very'>
            <Placeholder key={i}>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Segment>
        ))}
      </Segment.Group>

    </Layout>
  );
}
