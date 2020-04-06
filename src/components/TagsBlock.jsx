import React from 'react';
import { Link } from 'gatsby';

const TagsBlock = ({ list }) => {
  return (
    <div>
      <h1>Tags BLOCK</h1>
      {list.map((tag) => (
        <Link key={tag} to={`/tags/${tag}`}>
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagsBlock;
