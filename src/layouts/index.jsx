import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import Headroom from 'react-headroom';
import Navbar from '../components/Navbar/Navbar.component';
import Carousel from 'react-bootstrap/Carousel';

import Img from 'gatsby-image';

const menuLinks = [
  { address: '/', name: 'Acasa' },
  { address: '/produse', name: 'Produse' },
  { address: '/despre', name: 'Despre' },
  { address: '/contact', name: 'contact' },
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
        allFile(filter: { absolutePath: { regex: "/assets/" } }) {
          edges {
            node {
              id
              childImageSharp {
                fluid(maxWidth: 1200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      console.log(data);

      return (
        <div>
          <Headroom>
            <Navbar logo="Online Medical" menuItems={menuLinks} />
          </Headroom>

          <Carousel>
            <Carousel.Item>
              <Img
                fluid={data.allFile.edges[0].node.childImageSharp.fluid}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Img
                fluid={data.allFile.edges[1].node.childImageSharp.fluid}
                alt="First slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Img
                fluid={data.allFile.edges[2].node.childImageSharp.fluid}
                alt="First slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <Link to={'/'}>
            <h3>{data.site.siteMetadata.title}</h3>
          </Link>
          <Link to={'/about'}>About</Link>
          {children}
        </div>
      );
    }}
  />
);
