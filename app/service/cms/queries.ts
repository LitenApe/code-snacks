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

export const post = gql`
  query ($id: ID!) {
    posts(filters: { id: { eq: $id } }) {
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

export const draft = gql`
  query ($id: ID!) {
    posts(
      publicationState: PREVIEW
      filters: { id: { eq: $id }, publishedAt: null }
    ) {
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
