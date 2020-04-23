import React from "react";
import Layout from "../layouts/index";
import { graphql, Link } from "gatsby";
import { Carousel } from "react-bootstrap";
import Img from "gatsby-image";
import BgImage from "../components/BgImage/BgImage";

import "./index.scss";

export default ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Carousel>
        <Carousel.Item>
          <BgImage
            fluid={data.allFile.edges[0].node.childImageSharp.fluid}
            height="400px"
            mobileHeight="200px"
            overlayColor="#0400ff54"
          />
        </Carousel.Item>
        <Carousel.Item>
          <BgImage
            fluid={data.allFile.edges[1].node.childImageSharp.fluid}
            height="400px"
            mobileHeight="200px"
            overlayColor="#0400ff54"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <BgImage
            fluid={data.allFile.edges[2].node.childImageSharp.fluid}
            height="400px"
            mobileHeight="200px"
            overlayColor="#0400ff54"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
