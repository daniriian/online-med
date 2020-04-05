import React from "react";
import { graphql } from "gatsby";
import Layout from "../layouts/index";

export default ({ data }) => (
  <Layout>
    <h1>{data.site.siteMetadata.title} About Page</h1>
    <p>This is the About page.</p>
  </Layout>
);

export const query = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
