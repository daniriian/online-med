import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import TagsBlock from '../components/TagsBlock';
import ProductList from '../components/ProductList/ProductList';
import Layout from '../layouts/index';

import '../utils/fontawesome';

import './product.scss';
import './product_responsive.scss';

const Product = ({ data }) => {
  const fdata = data.markdownRemark;
  const desc = fdata.frontmatter.description;
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  return (
    <Layout>
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
                  <div className="product_quantity clearfix">
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
        description
      }
    }
  }
`;
