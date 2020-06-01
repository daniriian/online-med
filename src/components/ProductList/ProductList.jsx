import React from "react";
import { graphql, StaticQuery } from "gatsby";

import ProductCard from "../ProductCard/ProductCard";

import "./ProductList.scss";

const Products = ({ title, tagList }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { frontmatter: { title: { ne: "specs" } } }
            sort: { order: ASC, fields: frontmatter___title }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  path
                  tags
                  description
                  main_image {
                    childImageSharp {
                      fluid(maxWidth: 500, maxHeight: 380) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                excerpt(pruneLength: 120)
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
      `}
      render={(data) => {
        // const { edges } = data.allMarkdownRemark;
        let edges = [];
        if (!tagList) {
          //daca nu exista taguri ...
          edges = data.allMarkdownRemark.edges;
        } else {
          // daca exista taguri ...
          //filtram lista de produse dupa tagurile fiecarui produs
          edges = data.allMarkdownRemark.edges.filter((edge) =>
            edge.node.frontmatter.tags.some((r) => tagList.indexOf(r) > 0)
          );
        }

        return (
          <section className="container">
            <h1 className="title">{title}</h1>

            <div className="container-primary">
              {edges.map(({ node }) => {
                return (
                  <div key={node.id} className="item">
                    <ProductCard
                      cardTitle={node.frontmatter.title}
                      fluidImg={
                        node.frontmatter.main_image.childImageSharp.fluid
                      }
                      altImg=""
                      productPage={node.frontmatter.path}
                      excerpt={node.excerpt}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      }}
    />
  );
};

export default Products;
