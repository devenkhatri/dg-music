import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Header, Card, Icon, Placeholder } from 'semantic-ui-react'
import _ from 'lodash';

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <Header as='h1' icon textAlign='center'>
        <Icon name='soundcloud' circular inverted color="blue" />
        <Header.Content>List of Songs</Header.Content>
      </Header>
      <Card.Group doubling itemsPerRow={3} stackable>
        {_.times(5, (i) => (
          <Card>
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in 2015</span>
              </Card.Meta>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

    </Layout>
  );
}
