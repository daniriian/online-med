module.exports = {
  siteMetadata: {
    title: 'Online Medical',
    description:
      'Bine ati venit pe site-ul nostru dedicat echipamentelor medicale.',
    author: 'Daniel RT',
  },

  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/content/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `carousel-imgs`,
        path: `${__dirname}/content/assets/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
  ],
};
