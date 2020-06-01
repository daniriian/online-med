import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Headroom from "react-headroom";
import Navbar from "../components/Navbar/Navbar.component";
import Footer from "../components/Footer/Footer.jsx";

import "./index.scss";

const menuLinks = [
  { address: "/", name: "Acasa" },
  { address: "/produse", name: "Produse" },
  { address: "/despre", name: "Despre" },
  { address: "/contact", name: "contact" },
];

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => {
      // console.log(data);

      return (
        <div>
          <Headroom>
            <Navbar logo="Online Medical" menuItems={menuLinks} />
          </Headroom>

          {children}

          <Footer />
        </div>
      );
    }}
  />
);
