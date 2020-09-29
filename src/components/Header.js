import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn';
import config from '../../config.js';
import Search from './search';
import { ExternalLink } from '@styled-icons/evil/ExternalLink';
import Link from './link';
const help = require('./images/help.svg');

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];

if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

import Sidebar from './sidebar';

function myFunction() {
  var x = document.getElementById('navbar');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
  display: none;
  background: ${props => (props.isDarkThemeActive ? '#001932' : undefined)};

  @media (max-width: 900px) {
    display: block;
  }
`;

const StyledAIcon = styled('div')`
  display: flex;
  position: relative;
  align-items: baseline;
  padding-right: 22px;
`;

const StyledExternalDiv = styled.div`
  display: flex;
  align-items: baseline;
  padding-left: 16px;
  height: 30px;
`;

const StyledExternalLink = styled(ExternalLink)`
  top: -3px;
  right: -3px;
  position: absolute;
`;

const Header = ({ location, isDarkThemeActive }) => {
  return (
    <StaticQuery
      query={graphql`
        query headerTitleQuery {
          site {
            siteMetadata {
              githubUrl
              helpUrl
              tweetText
              logo {
                link
                image
              }
              headerTitle
              headerLinks {
                link
                text
                external
              }
            }
          }
        }
      `}
      render={data => {
        const logoImg = require('./images/logo.svg');

        const twitter = require('./images/twitter.svg');

        const {
          site: {
            siteMetadata: { githubUrl, helpUrl, tweetText, logo, headerLinks, headerTitle },
          },
        } = data;

        const finalLogoLink = logo.link !== '' ? logo.link : 'https://hasura.io/';

        return (
          <div className={'navBarWrapper'}>
            <nav className={'navBarDefault'}>
              <div className={'navBarHeader'}>
                <a href={finalLogoLink} className={'navBarBrand'}>
                  <img
                    className={'img-responsive displayInline'}
                    src={logo.image !== '' ? logo.image : logoImg}
                    alt={'logo'}
                  />
                </a>
                <div
                  className={'headerTitle displayInline'}
                  dangerouslySetInnerHTML={{ __html: headerTitle }}
                />
              </div>
              {config.header.social ? (
                <ul
                  className="socialWrapper visibleMobileView"
                  dangerouslySetInnerHTML={{ __html: config.header.social }}
                ></ul>
              ) : null}
              {isSearchEnabled ? (
                <div className={'searchWrapper hiddenMobile navBarUL'}>
                  <Search expand={true} indices={searchIndices}></Search>
                </div>
              ) : null}
              <div id="navbar" className={'topnav'}>
                <div className={'visibleMobile'}>
                  <Sidebar location={location} />
                  <hr />
                </div>
                <ul className={'navBarUL navBarNav navBarULRight'}>
                  {headerLinks.map((link, key) => {
                    if (link.link !== '' && link.text !== '') {
                      if (link.external) {
                        return (
                          <li key={key}>
                            <StyledExternalDiv>
                              <a
                                className="sidebarLink"
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <StyledAIcon>
                                  <div>{link.text}</div>
                                  <StyledExternalLink size={22}></StyledExternalLink>
                                </StyledAIcon>
                              </a>
                            </StyledExternalDiv>
                          </li>
                        );
                      } else {
                        return (
                          <li key={key}>
                            <StyledExternalDiv>
                              <Link className="sidebarLink" to={link.link}>
                                {link.text}
                              </Link>
                            </StyledExternalDiv>
                          </li>
                        );
                      }
                    }
                  })}
                  {helpUrl !== '' ? (
                    <li>
                      <a href={helpUrl}>
                        <img src={help} alt={'Help icon'} />
                      </a>
                    </li>
                  ) : null}

                  {tweetText !== '' ? (
                    <li>
                      <a
                        href={'https://twitter.com/intent/tweet?&text=' + tweetText}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img className={'shareIcon'} src={twitter} alt={'Twitter'} />
                      </a>
                    </li>
                  ) : null}
                  {tweetText !== '' || githubUrl !== '' ? (
                    <li className="divider hiddenMobile"></li>
                  ) : null}
                  {config.header.social ? (
                    <li className={'hiddenMobile'}>
                      <ul
                        className="socialWrapper"
                        dangerouslySetInnerHTML={{ __html: config.header.social }}
                      ></ul>
                    </li>
                  ) : null}
                  {githubUrl !== '' ? (
                    <li className={'githubBtn'}>
                      <GitHubButton
                        href={githubUrl}
                        data-show-count="true"
                        aria-label="Star on GitHub"
                      >
                        Star
                      </GitHubButton>
                    </li>
                  ) : null}
                </ul>
              </div>
            </nav>
            <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
              <div className={'navBarDefault removePadd'}>
                <span
                  onClick={myFunction}
                  className={'navBarToggle'}
                  onKeyDown={myFunction}
                  role="button"
                  tabIndex={0}
                >
                  <span className={'iconBar'}></span>
                  <span className={'iconBar'}></span>
                  <span className={'iconBar'}></span>
                </span>
              </div>
              {isSearchEnabled ? (
                <div className={'searchWrapper'}>
                  <Search indices={searchIndices}></Search>
                </div>
              ) : null}
            </StyledBgDiv>
          </div>
        );
      }}
    />
  );
};

export default Header;
