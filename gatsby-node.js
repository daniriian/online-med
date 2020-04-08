const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const productTemplate = path.resolve("src/templates/product.jsx");
    const tagPage = path.resolve("src/components/tags/tags.jsx");
    const tagProducts = path.resolve("src/templates/tag.jsx");

    resolve(
      graphql(`
        query {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  path
                  tags
                  title
                }
                html
                parent {
                  ... on File {
                    dir
                  }
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

        const tags = Object.keys(productsByTag);

        createPage({
          path: `/tags`,
          component: tagPage,
          context: {
            tags: tags.sort(),
          },
        });

        //create tags
        tags.forEach((tagName) => {
          const products = productsByTag[tagName];

          createPage({
            path: `/tags/${tagName}`,
            component: tagProducts,
            context: {
              products,
              tagName,
            },
          });
        });

        //create products

        products.forEach(({ node }) => {
          const path = node.frontmatter.path;
          console.log("--------------------------------------------------");
          console.log(node);
          const dir = node.parent.dir;

          createPage({
            path,
            component: productTemplate,
            context: {
              pathSlug: path,
              directory: dir,
            },
          });
        });
      })
    );
  });
};
