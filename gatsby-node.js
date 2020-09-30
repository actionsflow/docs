const { titleCase } = require('title-case');

const path = require('path');

const startCase = require('lodash.startcase');

const config = require('./config');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: path.resolve('./src/templates/docs.js'),
            context: {
              id: node.fields.id,
            },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    let value = parent.relativePath.replace(parent.ext, '');

    if (value.startsWith('docs/')) {
      value = value.slice(5);
    }

    if (value === 'index') {
      value = '';
    }

    // officail trigger doc
    const triggerPackageDocRegex = new RegExp('packages/actionsflow-trigger-(.+?)/README');

    if (triggerPackageDocRegex.test(value)) {
      const regexResult = value.match(triggerPackageDocRegex);

      if (regexResult && regexResult[1]) {
        value = `triggers/${regexResult[1]}`;
        // change node formatter
        if (!node.frontmatter.title) {
          node.frontmatter.title = titleCase(regexResult[1]);
        }
        if (!node.frontmatter.metaTitle) {
          node.frontmatter.metaTitle = `Actionsflow ${titleCase(regexResult[1])} Trigger`;
        }
      }
    }

    // officail package doc
    // packages/actionsflow-interface/README
    const packageDocRegex = new RegExp('packages/actionsflow\\-(.+?)/README');

    if (packageDocRegex.test(value)) {
      const regexResult = value.match(packageDocRegex);

      if (regexResult && regexResult[1]) {
        value = `reference/actionsflow-${regexResult[1]}-api`;
        // change node formatter
        if (!node.frontmatter.title) {
          node.frontmatter.title = `Package actionsflow-${regexResult[1]} API`;
        }
        if (!node.frontmatter.metaTitle) {
          node.frontmatter.metaTitle = `Actionsflow Package ${node.frontmatter.title} API`;
        }
      }
    }

    // awesome actionsflow package doc

    if (value === 'awesome-actionsflow/readme') {
      value = `awesome`;
      // change node formatter
      if (!node.frontmatter.title) {
        node.frontmatter.title = `Awesome Workflows`;
      }
      if (!node.frontmatter.metaTitle) {
        node.frontmatter.metaTitle = `Awesome Actionsflow Workflows`;
      }
      if (!node.frontmatter.githubEditLink) {
        node.frontmatter.githubEditLink =
          'https://github.com/actionsflow/awesome-actionsflow/blob/main/readme.md';
      }
    }
    if (config.gatsby && config.gatsby.trailingSlash) {
      createNodeField({
        name: `slug`,
        node,
        value: value === '' ? `/` : `/${value}/`,
      });
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: `/${value}`,
      });
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    });
  }
};
