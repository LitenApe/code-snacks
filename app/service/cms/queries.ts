import { gql } from '@apollo/client';

export const posts = gql`
  query {
    posts {
      data {
        id
        attributes {
          title
          tags {
            data {
              attributes {
                name
              }
            }
          }
          content
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

export const drafts = gql`
  query {
    posts(publicationState: PREVIEW, filters: { publishedAt: null }) {
      data {
        id
        attributes {
          title
          tags {
            data {
              attributes {
                name
              }
            }
          }
          content
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const tags = gql`
  query {
    tags {
      data {
        attributes {
          name
        }
      }
    }
  }
`;

export const footer = gql`
  query {
    footer {
      data {
        attributes {
          credits
        }
      }
    }
  }
`;
