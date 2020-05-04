import React from 'react';
import Img from 'gatsby-image';

import './productCard.scss';

const ProductCard = ({ cardTitle, fluidImg, altImg, productPage, excerpt }) => {
  return (
    <div className="card h-100" style={{ width: '20rem' }}>
      <Img fluid={fluidImg} alt={altImg} />
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">{excerpt}</p>
        <a href={productPage} className="btn btn-primary">
          Mai multe detalii
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
