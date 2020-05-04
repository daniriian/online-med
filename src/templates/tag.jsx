import React from 'react';
import { Link } from 'gatsby';

const Tag = ({ pageContext }) => {
  const { products, tagName } = pageContext;
  // console.log(pageContext);
  return (
    <div>
      <div>Products from {`${tagName}`}</div>
      <div>
        <ul>
          {products.map((product, index) => {
            return (
              <li key={index}>
                <Link to={product.frontmatter.path}>
                  {product.frontmatter.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Tag;
