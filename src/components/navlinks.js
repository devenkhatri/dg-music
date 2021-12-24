import React from "react"
import { Link } from "gatsby"

import { Button } from "semantic-ui-react"

const NavLinks = () => {
  return (
    <>
      <Button as={Link} color="blue" to="/">
        Recordings
      </Button>
    </>
  )
}

export default NavLinks