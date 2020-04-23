import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

const Parent = styled.div`
  position: relative;
  background-color: ${({ bc }) => bc};
`;

const FakeBgImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  z-index: -1;

  & > img {
    object-fit: cover !important;
    object-position: 0% 0% !important;
    font-family: "object-fit: cover !important; object-position: 0% 0% !important;";
  }

  @media screen and (max-width: 600px) {
    height: ${({ mobileHeight }) => mobileHeight};
  }
`;

const BgImage = ({ fluid, title, height, mobileHeight, overlayColor }) => {
  return (
    <Parent bc={overlayColor}>
      <FakeBgImage
        fluid={fluid}
        title={title}
        height={height}
        mobileHeight={mobileHeight}
      />
    </Parent>
  );
};

export default BgImage;
