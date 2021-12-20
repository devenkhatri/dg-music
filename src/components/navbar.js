import * as React from "react"
import "semantic-ui-css/semantic.min.css"
import { Link } from "gatsby"

import {
  Grid,
  Header,
  Icon,
  Container,
  Segment,
  Button,
} from "semantic-ui-react"

import NavLinks from "./navlinks"

const Navbar = ({ siteTitle, setVisible, visible }) => {
  return (
    <>
      <Segment inverted color="blue" as="nav" attached>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width="6" verticalAlign="middle" as={Link} to="/">
                <Header as="h1" size="small" inverted>
                  {siteTitle}
                </Header>
              </Grid.Column>
              <Grid.Column width="10" only="mobile">
                <Header size="tiny" textAlign="right">
                  <Icon
                    name="bars"
                    link
                    size="big"
                    inverted
                    onClick={() => setVisible(!visible)}
                  />
                </Header>
              </Grid.Column>
              <Grid.Column
                widescreen="10"
                only="computer tablet"
                textAlign="right"
              >
                <Button.Group as="ul">
                  <NavLinks />
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  )
}

export default Navbar;