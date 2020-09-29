import algoliasearch from 'algoliasearch/lite';
import { createRef, default as React, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import StyledSearchBox from './styled-search-box';
import StyledSearchResult from './styled-search-result';
import StyledSearchRoot from './styled-search-root';
import useClickOutside from './use-click-outside';

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

export default function Search({ indices, expand = false }) {
  const rootRef = createRef();

  const [query, setQuery] = useState();

  const [hasFocus, setFocus] = useState(false);

  useClickOutside(rootRef, () => setFocus(false));
  return (
    <StyledSearchRoot ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <StyledSearchBox expand={expand} onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        <StyledSearchResult show={query && query.length > 0 && hasFocus} indices={indices} />
      </InstantSearch>
    </StyledSearchRoot>
  );
}
