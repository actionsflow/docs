import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GithubSlugger from 'github-slugger';
import styled from '@emotion/styled';

// import Link from './link';
import config from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';
const UlList = styled.ul``;

const ListItem2 = styled.li`
  padding-left: 1rem;
`;

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents(maxDepth: 2)
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      var slugger = new GithubSlugger();

      let navItems = [];

      let finalNavItems;

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        const navItems = allMdx.edges.map((item, index) => {
          let innerItems;

          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
                  const itemId = innerItem.title ? slugger.slug(innerItem.title) : '#';

                  let level2Items = [];

                  if (innerItem.items) {
                    level2Items = innerItem.items.map((level2Item, index2) => {
                      const level2ItemId = level2Item.title ? slugger.slug(level2Item.title) : '#';

                      return (
                        <ListItem key={'key_' + index + index2} to={`#${level2ItemId}`} level={1}>
                          {level2Item.title}
                        </ListItem>
                      );
                    });
                  }

                  return [
                    <ListItem key={index} to={`#${itemId}`} level={0}>
                      {innerItem.title}
                    </ListItem>,
                    <UlList key={'ul_' + index}>{level2Items}</UlList>,
                  ];
                });
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <Sidebar>
            <ul className={'rightSideBarUL'}>
              <li className={'rightSideTitle'}>CONTENTS</li>
              {finalNavItems}
            </ul>
          </Sidebar>
        );
      } else {
        return (
          <Sidebar>
            <ul></ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
