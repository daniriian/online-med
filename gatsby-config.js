module.exports = {
  siteMetadata: {
    title: "Online Medical",
    description:
      "Bine ati venit pe site-ul nostru dedicat echipamentelor medicale.",
    author: "Daniel RT",
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
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
  ],
};
