import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import TagsBlock from '../components/TagsBlock';
import ProductCard from '../components/ProductCard/ProductCard';
import Layout from '../layouts/index';

import './product.scss';
import './product_responsive.scss';

const Product = ({ data, pageContext }) => {
  const fdata = data.markdownRemark;
  const desc = fdata.frontmatter.description;
  const [activeThumb, setActiveThumb] = useState(0);

  const recomended_products = data.markdownRemark.frontmatter.tags || [];
  const handleClick = (index) => {
    setActiveThumb(index);
  };

  return (
    <Layout>
      {/* <h1>{data.markdownRemark.frontmatter.title}</h1>
      <TagsBlock list={data.markdownRemark.frontmatter.tags || []} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div> */}

      {/*Product Details*/}

      <div className="product_details">
        <div className="container">
          <div className="row details_row">
            {/*Product Image*/}

            <div className="col-lg-6">
              <div className="details_image">
                <div className="details_image_large">
                  <Img
                    fluid={
                      data.allFile.edges[activeThumb].node.childImageSharp.fluid
                    }
                    alt={data.markdownRemark.frontmatter.title}
                  />
                  <div className="product_extra product_new">
                    <a href="categories.html">NOU</a>
                  </div>
                </div>
                <div className="details_image_thumbnails d-flex flex-row align-items-start justify-content-between">
                  {data.allFile.edges.map((edge, index) => {
                    return (
                      <div
                        key={index}
                        className={`details_image_thumbnail ${
                          index === activeThumb ? 'active' : ''
                        }`}
                        onClick={() => handleClick(index)}
                      >
                        <Img
                          fluid={edge.node.childImageSharp.fluid}
                          alt={data.markdownRemark.frontmatter.title}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/*Product Content*/}
            <div className="col-lg-6">
              <div className="details_content">
                <div className="details_name">{fdata.frontmatter.title}</div>
                <div className="details_discount">599 Lei</div>
                <div className="details_price">499 Lei</div>

                {/*In Stock*/}
                <div className="in_stock_container">
                  <div className="availability">Disponibilitate:</div>
                  <span>In Stoc</span>
                </div>
                <div className="details_text">
                  {desc.map((el, index) => (
                    <p key={index}>{el}</p>
                  ))}
                </div>

                {/*Product Quantity*/}
                <div className="product_quantity_container">
                  <div className="product_quantity clearfix">
                    <span>Qty</span>
                    <div
                      className="qty_input"
                      id="quantity_input"
                      type="text"
                      pattern="[0-9]*"
                      value="1"
                    >
                      <div className="quantity_buttons">
                        <div
                          id="quantity_inc_button"
                          className="quantity_inc quantity_control"
                        >
                          <i
                            className="fa fa-chevron-up"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div
                          id="quantity_dec_button"
                          className="quantity_dec quantity_control"
                        >
                          <i
                            className="fa fa-chevron-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button cart_button">
                    <a href="#">Add to cart</a>
                  </div>
                </div>

                {/*Share*/}
                <div className="details_share">
                  <span>Share:</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row description_row">
            <div className="col">
              <div className="description_title_container">
                <div className="description_title">Descriere</div>
                <div className="reviews_title">
                  <a href="#">Specificatii</a>
                </div>
              </div>
              <div className="description_text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.markdownRemark.html,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recomended container">
        <hr></hr>
        <h1>Produse recomandate</h1>
        {console.log(recomended_products)}
      </div>
      {/*Products*/}

      {/*------------------------------*/}
    </Layout>
  );
};

export default Product;

export const query = graphql`
  query($pathSlug: String!, $directory: String!) {
    allFile(
      filter: { ext: { in: [".jpg", ".png"] }, dir: { eq: $directory } }
    ) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 380) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      excerpt(pruneLength: 400)
      frontmatter {
        path
        tags
        title
        description
      }
    }
  }
`;
