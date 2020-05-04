import React from 'react';
import Layout from '../layouts/index';
import { graphql, Link } from 'gatsby';
import { Carousel } from 'react-bootstrap';

import BgImage from '../components/BgImage/BgImage';
import Products from '../components/Products/Products';

import './index.scss';

export default ({ data }) => {
  return (
    <Layout>
      <Carousel>
        {data.allFile.edges.map((edge, index) => (
          <Carousel.Item key={index}>
            <BgImage
              fluid={edge.node.childImageSharp.fluid}
              height="400px"
              mobileHeight="200px"
              overlayColor="#0400ff54"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Products />
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile(filter: { absolutePath: { regex: "/assets/" } }) {
      edges {
        node {
          id
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 250, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
