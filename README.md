# Actionsflow Docs Site With GatsbyJS

Live URL: <https://actionsflow.github.io/docs/>

[Source docs](https://github.com/actionsflow/actionsflow/tree/main/docs) for build site.

## Getting Started <a name = "getting_started"></a>

```bash
yarn start
```

### Prerequisites

```
yarn install
```

To run locally, you should create `.env` file for environment variable:

```bash
GATSBY_ALGOLIA_APP_ID=
GATSBY_ALGOLIA_SEARCH_KEY=
ALGOLIA_ADMIN_KEY=
GATSBY_ALGOLIA_INDEX_NAME=
LOCAL_DOCS_PATH=../actionsflow/docs
```

> Set `LOCAL_DOCS_PATH` to load docs locally, instead of from github online repo

## Usage <a name = "usage"></a>

### Build Site

```bash
yarn build
```
