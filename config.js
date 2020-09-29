const isDev = process.env.NODE_ENV === 'development';

const config = {
  gatsby: {
    pathPrefix: '/docs',
    siteUrl: 'https://actionsflow.github.io',
    gaTrackingId: 'UA-164063423-3',
    trailingSlash: true,
  },
  header: {
    logo: '',
    logoLink: '/',
    title: `<a href="${isDev ? '/' : '/docs/'}">Actionsflow</a>`,
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    social: ``,
    links: [
      { text: 'Triggers', link: '/triggers/' },
      { text: 'Workflows', link: '/explore/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Github', external: true, link: 'https://github.com/actionsflow/actionsflow' },
    ],
    search: {
      enabled: true,
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/',
      '/getting-started/', // add trailing slash if enabled above
      '/concepts/',
      '/workflow/',
      '/awesome/',
      '/triggers/',
      '/creating-triggers/',
      '/webhook/',
      '/actions/',
      '/reference/',
      '/faqs/',
      '/compare/',
      '/contributing/',
      '/about/',
      '/upgrade/',
    ],
    collapsedNav: [
      '/creating-triggers/',
      '/reference/',
      '/triggers/',
      // add trailing slash if enabled above
    ],
    links: [],
    frontline: true,
    ignoreIndex: false,
    ignoreReadme: true,
    title: '',
  },
  siteMetadata: {
    title: 'Actionsflow Documentation',
    description:
      'Actionsflow is a tool for developers to build and run workflows. Like IFTTT, Zapier,you can run a workflow that is triggered by RSS, Webhook, Poll, Telegram Bot, and the other triggers that actionsflow supported',
    ogImage: null,
    docsLocation: 'https://github.com/actionsflow/actionsflow/tree/main',
    favicon: 'https://ik.imagekit.io/owen/actionsflow/log_3zE01MsatzK.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Actionsflow Documentation',
      short_name: 'Actionsflow',
      start_url: '/docs/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
