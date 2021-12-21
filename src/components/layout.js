//@ts-check
import * as React from "react"
import { Sidebar, Menu, Container, Button, Segment } from 'semantic-ui-react'
import Navbar from "./navbar"
import NavLinks from "./navlinks"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  const [visible, setVisible] = React.useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="push"
        color="blue"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <Button.Group vertical style={{ marginTop: "3rem" }}>
          <NavLinks />
        </Button.Group>
      </Sidebar>
      <Sidebar.Pusher dimmed={visible} style={{position:'relative'}}>
        <Navbar
          siteTitle={data.site.siteMetadata?.title}
          setVisible={setVisible}
          visible={visible}
        />
        <Container as="main" style={{padding: '1rem 0'}}>{children}</Container>
        <Segment color="blue" inverted textAlign="center" as="footer">
          © {new Date().getFullYear()}, Built with Gatsby
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default Layout