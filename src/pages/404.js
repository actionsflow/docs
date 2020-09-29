import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import styled from '@emotion/styled';
const StyledDiv = styled.div`
  padding: 20px;
`;

const NotFoundPage = () => {
  const pageTitle = '404: Not Found';

  return (
    <StyledDiv>
      <Helmet>
        {pageTitle ? <title>{pageTitle}</title> : null}
        {pageTitle ? <meta name="title" content={pageTitle} /> : null}
      </Helmet>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <p>
        <a href={withPrefix('/')}>GO HOME</a>
      </p>
    </StyledDiv>
  );
};

export default NotFoundPage;
