import React from "react";
import { graphql } from "gatsby";

const Product = ({ data }) => {
  return (
    <div>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
    </div>
  );
};

export default Product;

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`;
