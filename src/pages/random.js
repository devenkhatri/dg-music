import React from "react";
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby';
import _ from 'lodash';

const SongRandom = ({ data }) => {
  let allRecordings = data.allRecordings || []

  //getting the random song
  const random = Math.floor(Math.random() * allRecordings.edges.length);
  const redirectSlug = '/recording/' + allRecordings.edges[random].node.fields.slug;

  return (
    <Helmet>
      <meta http-equiv="refresh" content={`0; url = ${redirectSlug}`} />
    </Helmet>
  );
}

export default SongRandom;

export const query = graphql`
query {
  allRecordings: allAirtable(
    filter: {table: {eq: "Recordings"}}
    sort: {fields: data___SongTitle}
  ) {
    edges {
      node {
        recordId
        fields {
          slug
        }
        data {
          SongTitle
        }
      }
    }    
  }
}
`;