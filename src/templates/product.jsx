import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import Img from 'gatsby-image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import TagsBlock from '../components/TagsBlock';
import ProductList from '../components/ProductList/ProductList';
import Layout from '../layouts/index';

import '../utils/fontawesome';

import './product.scss';
import './product_responsive.scss';

// styled components
const ProductDetails = styled.div`
  width: 100%;
  background: #ffffff;
  z-index: 2;
`;

const Product = ({ data }) => {
  const fdata = data.markdownRemark;
  const desc = fdata.frontmatter.description;
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  // const recomended_products = data.markdownRemark.frontmatter.tags || [];
  const handleClick = (index) => {
    setActiveThumb(index);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  console.log('___________________________________');
  console.log(data);
  console.log('++++++++++++++++++++++++');
  console.log(data.pdf.edges[0].node.publicURL);

  return (
    <Layout>
      <ProductDetails>
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
                    <Link to="/">SALE</Link>
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
                  <div className="product_quantity clearfix noselect">
                    <span>Qty</span>
                    <input
                      className="qty_input"
                      id="quantity_input"
                      type="text"
                      pattern="[0-9]*"
                      value={quantity}
                    ></input>
                    <div className="quantity_buttons">
                      <div
                        id="quantity_inc_button"
                        className="quantity_inc quantity_control"
                      >
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-up']}
                          onClick={increaseQuantity}
                        />
                      </div>
                      <div
                        id="quantity_dec_button"
                        className="quantity_dec quantity_control"
                      >
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-down']}
                          onClick={decreaseQuantity}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="button cart_button">
                    <a href="#">Adauga în coş</a>
                  </div>
                </div>

                {/*Share*/}
                <div className="details_share">
                  <span>Share:</span>
                  <ul>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'pinterest']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
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
                <div
                  className={`tab ${!activeTab ? 'tab_active' : ''}`}
                  onClick={() => setActiveTab(0)}
                >
                  Descriere
                </div>
                <div
                  className={`tab ${activeTab ? 'tab_active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  Specificaţii
                </div>
              </div>
              <div className="description_text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.markdownRemark.html,
                  }}
                ></p>
                <a
                  href={data.pdf.edges[0].node.publicURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datasheet
                </a>
              </div>
            </div>
          </div>
        </div>
      </ProductDetails>

      <div className="recomended container">
        <hr></hr>
        <ProductList
          title="Produse recomandate"
          tagList={data.markdownRemark.frontmatter.tags}
        />
      </div>
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
        linkedSpecs {
          childMarkdownRemark {
            frontmatter {
              title
              datasheet
            }
          }
        }
        description
      }
    }

    pdf: allFile(filter: { extension: { eq: "pdf" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`;
