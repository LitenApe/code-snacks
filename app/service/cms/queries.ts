import { gql } from '@apollo/client';

const postFragment = `
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
`;

export const posts = gql`
  query {
    posts {
      ${postFragment}
    }
  }
`;

export const post = gql`
  query ($id: ID!) {
    posts(filters: { id: { eq: $id } }) {
      ${postFragment}
    }
  }
`;

export const drafts = gql`
  query {
    posts(publicationState: PREVIEW, filters: { publishedAt: null }) {
      ${postFragment}
    }
  }
`;

export const draft = gql`
  query ($id: ID!) {
    posts(
      publicationState: PREVIEW
      filters: { id: { eq: $id }, publishedAt: null }
    ) {
      ${postFragment}
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
