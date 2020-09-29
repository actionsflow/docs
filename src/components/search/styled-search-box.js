import styled from '@emotion/styled';
import { css } from '@emotion/core';

import SearchBox from './search-box';
const theme = {
  foreground: '#050505',
  background: 'white',

  faded: '#888',
};

const open = css`
  width: 15em;
  background: ${theme.background};
  cursor: text;
  margin-left: -2em;
  padding-left: 2.6em;
`;

const closed = css`
  width: 0;
  background: transparent;
  cursor: pointer;
  margin-left: -1em;
  padding-left: 1em;
`;

export default styled(SearchBox)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;
  .SearchInput {
    padding: 10px;
    outline: none;
    border: ${({ hasFocus, expand }) => (hasFocus || expand ? '1px solid #cfd4db' : 'none')};
    font-size: 1em;
    transition: 100ms;
    border-radius: 5px;
    color: ${theme.foreground};
    ::placeholder {
      color: ${theme.faded};
    }
    ${({ hasFocus, expand }) => (hasFocus || expand ? open : closed)}
  }
  .SearchIcon {
    width: 1em;
    margin: 0.3em;
    color: #999999;
    pointer-events: none;
  }
`;
