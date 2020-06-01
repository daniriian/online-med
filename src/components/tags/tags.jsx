import React from "react";
import TagsBlock from "../TagsBlock";

const Tags = ({ pageContext }) => {
  // console.log(pageContext.tags);
  const { tags } = pageContext;

  return (
    <div>
      Tags Page Here
      <TagsBlock list={tags} />
    </div>
  );
};

export default Tags;
