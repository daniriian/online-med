import React from 'react';
import Img from 'gatsby-image';

const ProductCard = ({ cardTitle, fluidImg, altImg }) => {
  return (
    <div className="card" style={{ width: '20rem' }}>
      <Img fluid={fluidImg} alt={altImg} />
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
