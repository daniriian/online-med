import React from 'react';
import { graphql } from 'gatsby';

import TagsBlock from '../components/TagsBlock';

const Product = ({ data }) => {
  return (
    <div>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <TagsBlock list={data.markdownRemark.frontmatter.tags || []} />
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
        tags
      }
    }
  }
`;
