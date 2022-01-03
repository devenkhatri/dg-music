import React from "react"
import { Link } from "gatsby"

import { Button, Grid } from "semantic-ui-react"

const NavLinks = () => {
  return (
    <Grid>
      <Button as={Link} color="blue" to="/">
        Recordings
      </Button>
      <Button as={Link} color="blue" to="/statistics">
        Statistics
      </Button>
    </Grid>
  )
}

export default NavLinks