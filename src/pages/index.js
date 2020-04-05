import React from "react";
import Layout from "../layouts/index";
import { graphql, Link } from "gatsby";

export default ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <h1>This is Online Medical's Home Page</h1>
      <p>This is the Home Page</p>
      {edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.frontmatter.path}>
            <h3>titlu: {node.frontmatter.title}</h3>
          </Link>
          {node.frontmatter.tags.map((tag, index) => (
            <span key={index}>{tag}, </span>
          ))}
          <p>Taguri {node.frontmatter.tags}</p>
          <p>Excerpt: {node.excerpt}</p>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: frontmatter___title }) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            tags
          }
          excerpt
        }
      }
    }
  }
`;
