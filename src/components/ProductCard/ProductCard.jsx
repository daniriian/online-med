import React from 'react';
import Img from 'gatsby-image';

const ProductCard = ({ cardTitle, fluidImg, altImg, productPage, excerpt }) => {
  return (
    <div className="card" style={{ width: '20rem', marginBottom: '3rem' }}>
      <Img fluid={fluidImg} alt={altImg} />
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">{excerpt}</p>
        <a href={productPage} className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
