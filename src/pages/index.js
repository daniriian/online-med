import React from 'react';
import Layout from '../layouts/index';
import { graphql, Link } from 'gatsby';
import { Carousel } from 'react-bootstrap';

import BgImage from '../components/BgImage/BgImage';
import ProductCard from '../components/ProductCard/ProductCard';

import './index.scss';

export default ({ data }) => {
  const { edges } = data.allMarkdownRemark;
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

      <h1>Welcome to Online Medical's Shop</h1>

      <section className="product-section">
        <div className="container">
          {edges.map(({ node }) => (
            <div key={node.id}>
              <ProductCard
                cardTitle={node.frontmatter.title}
                fluidImg={node.frontmatter.main_image.childImageSharp.fluid}
                altImg=""
              />
              {/* <Link to={node.frontmatter.path}>
                <h3>titlu: {node.frontmatter.title}</h3>
              </Link>
              {node.frontmatter.tags.map((tag, index) => (
                <span key={index}>{tag}, </span>
              ))}

              <p>Taguri {node.frontmatter.tags}</p>
              <p>Excerpt: {node.excerpt}</p> */}
            </div>
          ))}
        </div>
      </section>
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
            main_image {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 380) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
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
