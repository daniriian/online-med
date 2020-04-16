import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import Headroom from 'react-headroom';
import Navbar from '../components/Navbar/Navbar.component';

const menuLinks = [
  { address: '/', name: 'Acasa' },
  { address: '/produse', name: 'Produse' },
  { address: '/despre', name: 'Despre' },
  { address: '/contact', name: 'contact' },
];

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <div>
        <Headroom>
          <Navbar logo="Online Medical" menuItems={menuLinks} />
        </Headroom>

        <Link to={'/'}>
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <Link to={'/about'}>About</Link>
        {children}
      </div>
    )}
  />
);
