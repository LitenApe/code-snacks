import { gql } from '@apollo/client';

const postFragment = gql`
  fragment CorePostFields on Post {
    title
    tags {
      data {
        id
        attributes {
          name
        }
      }
    }
    content
    createdAt
    updatedAt
  }
`;

export const posts = gql`
  ${postFragment}
  query {
    posts {
      data {
        id
        attributes {
          ...CorePostFields
          publishedAt
        }
      }
    }
  }
`;

export const post = gql`
  ${postFragment}
  query ($id: ID!) {
    posts(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          ...CorePostFields
          publishedAt
        }
      }
    }
  }
`;

export const drafts = gql`
  ${postFragment}
  query {
    posts(publicationState: PREVIEW, filters: { publishedAt: null }) {
      data {
        id
        attributes {
          ...CorePostFields
        }
      }
    }
  }
`;

export const draft = gql`
  ${postFragment}
  query ($id: ID!) {
    posts(
      publicationState: PREVIEW
      filters: { id: { eq: $id }, publishedAt: null }
    ) {
      data {
        id
        attributes {
          ...CorePostFields
        }
      }
    }
  }
`;

export const tags = gql`
  query {
    tags {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const postPost = gql`
  ${postFragment}
  mutation ($data: PostInput!) {
    createPost(data: $datat) {
      data {
        id
        attributes {
          ...CorePostFields
        }
      }
    }
  }
`;

const putPost = gql`
  ${postFragment}
  mutation ($id: ID!, $data: PostInput!) {
    updatePost(id: $id, data: $data) {
      data {
        id
        attributes {
          ...CorePostFields
        }
      }
    }
  }
`;

const postTag = gql`
  mutation ($data: TagInput!) {
    createTag(data: $data) {
      data {
        id
        attributes {
          name
          posts {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
