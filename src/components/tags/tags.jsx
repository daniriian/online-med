import React from "react";
import { Link } from "gatsby";

const Tags = ({ pageContext }) => {
  console.log(pageContext.tags);
  const { tags } = pageContext;

  return (
    <div>
      Tags Page Here
      <ul>
        {tags.map((tagName, index) => {
          return (
            <li key={index}>
              <Link to={`/tags/${tagName}`}>{tagName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
