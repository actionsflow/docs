require('dotenv').config();
const path = require('path');

const queries = require('./src/utils/algolia');

const config = require('./config');

const localDocsPath = process.env.LOCAL_DOCS_PATH;

let plugins = ['gatsby-plugin-catch-links'];

if (localDocsPath) {
  plugins.push({
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'git-docs',
      path: path.resolve(__dirname, localDocsPath),
      ignore: [
        '**/docs/**/README.md',
        '**/examples/**/*',
        '**/.github/**/*',
        '**/actionsflow/README.md',
        '**/CONTRIBUTING.md',
        '**/CHANGELOG.md',
        '**/.git/**/*',
        '**/dist/**/*',
        '**/.cache/**/*',
        '**/src/**/*',
      ],
    },
  });
} else {
  // production
  plugins.push({
    resolve: `@theowenyoung/gatsby-source-git`,
    options: {
      name: `git-docs`,
      remote: 'https://github.com/actionsflow/actionsflow',
      branch: 'main',
      // Optionally supply a branch. If none supplied, you'll get the default branch.
      // Tailor which files get imported eg. import the docs folder from a codebase.
      patterns: ['docs/**/*.md', '!docs/**/README.md', 'packages/actionsflow-*/README.md'],
    },
  });
}
plugins.push({
  resolve: `@theowenyoung/gatsby-source-git`,
  options: {
    name: `awesome-actionsflow`,
    remote: 'https://github.com/actionsflow/awesome-actionsflow',
    branch: 'main',
    rootDir: '../',
    // Optionally supply a branch. If none supplied, you'll get the default branch.
    // Tailor which files get imported eg. import the docs folder from a codebase.
    patterns: [`awesome-actionsflow/readme.md`],
  },
});

plugins = plugins.concat([
  'gatsby-plugin-sitemap',
  'gatsby-plugin-sharp',
  // {
  //   resolve: `gatsby-plugin-layout`,
  //   options: {
  //     component: require.resolve(`./src/templates/docs.js`),
  //   },
  // },
  'gatsby-plugin-emotion',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-link-rewrite',
          options: {
            pattern: /^\/docs\/(.+?)\.md(#.*?)?$/,
            replace: '/$1/$2',
          },
        }, // transform /docs/xxx.md to /xxx/
        {
          resolve: 'gatsby-remark-link-rewrite',
          options: {
            pattern: /^(\.\/|\.\.\/)(.*)\.md(#.*)?$/,
            replace: '../$1$2/$3',
          },
        }, // transform ../xxx.md to ../../xxx/
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
        'gatsby-remark-external-links',
        'gatsby-remark-autolink-headers',
      ],
      extensions: ['.mdx', '.md'],
    },
  },

  {
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: config.gatsby.gaTrackingId,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false,
    },
  },
]);

// check and add algolia
if (
  config.header.search &&
  config.header.search.enabled &&
  config.header.search.algoliaAppId &&
  config.header.search.algoliaAdminKey
) {
  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      enablePartialUpdates: true,
      appId: config.header.search.algoliaAppId, // algolia application id
      apiKey: config.header.search.algoliaAdminKey, // algolia admin key to index
      queries,
      chunkSize: 10000, // default: 1000
    },
  });
}
// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  });
  plugins.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: require.resolve(`./src/custom-sw-code.js`),
    },
  });
} else {
  plugins.push('gatsby-plugin-remove-serviceworker');
}

// check and remove trailing slash
if (config.gatsby && !config.gatsby.trailingSlash) {
  plugins.push('gatsby-plugin-remove-trailing-slashes');
}

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : '/',
      image: config.header.logo,
    }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins: plugins,
};
