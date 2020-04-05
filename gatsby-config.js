module.exports = {
  siteMetadata: {
    title: "Online Medical",
    description:
      "Bine ati venit pe site-ul nostru dedicat echipamentelor medicale.",
    author: "Daniel RT",
  },

  plugins: [
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/content/products`,
      },
    },
    `gatsby-transformer-remark`,
  ],
};
