export const posts = `
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

export const drafs = `
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

export const tags = `
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

export const footer = `
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
