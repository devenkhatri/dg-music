import * as React from "react"
import "semantic-ui-css/semantic.min.css"
import { Link } from "gatsby"
import Logo from '../images/icon.png'

import {
  Grid,
  Header,
  Icon,
  Container,
  Segment,
  Button,
  Menu,
} from "semantic-ui-react"

import NavLinks from "./navlinks"

const Navbar = ({ siteTitle, setVisible, visible }) => {
  return (
    <>
      <Segment inverted color="blue" as="nav">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width="7" verticalAlign="middle" as={Link} to="/">
                <Header as="h1" size="small" inverted>
                <img width="100" src={Logo} />
                  {siteTitle}
                </Header>
              </Grid.Column>
              <Grid.Column width="9" verticalAlign="middle" only="mobile">
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
                widescreen="9"
                only="computer tablet"
                textAlign="right"
                verticalAlign="middle" 
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