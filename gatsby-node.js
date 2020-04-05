const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const productTemplate = path.resolve("src/templates/product.jsx");
    const tagPage = path.resolve("src/components/tags/tags.jsx");
    const tagProducts = path.resolve("src.templates/tag.jsx");

    resolve(
      graphql(`
        query {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  title
                  path
                  tags
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          return Promise.reject(result.errors);
        }

        const products = result.data.allMarkdownRemark.edges;

        //create tags page
        const productsByTag = {};
        products.forEach(({ node }) => {
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach((tag) => {
              if (!productsByTag[tag]) {
                productsByTag[tag] = [];
              }
              productsByTag[tag].push(node);
            });
          }
        });

        console.log(productsByTag);
        const tags = Object.keys(productsByTag);
        console.log(tags);

        createPage({
          path: `/tags`,
          component: tagPage,
          context: {
            tags: tags.sort(),
          },
        });

        //create products

        products.forEach(({ node }) => {
          const path = node.frontmatter.path;

          createPage({
            path,
            component: productTemplate,
            context: {
              pathSlug: path,
            },
          });
        });
      })
    );
  });
};
