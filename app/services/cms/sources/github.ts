import { Source } from '../domain';

/**
const files = `
query {
  repository(owner: "LitenApe", name: "tech-snacks") {
    object(expression: "HEAD:app/content") {
      ... on Tree {
        entries {
          name
        }
      }
    }
  }
}`;

const file = `
query {
  repository(owner: "LitenApe", name: "tech-snacks") {
    object(expression: "HEAD:app/content/markdown.md") {
      ... on Blob {
        text
      }
    }
  }
}
`;
*/

class GitHub implements Source {
  async getPosts(): Promise<Array<unknown>> {
    return [];
  }

  async getPost(id: string): Promise<unknown> {
    return {
      id,
    };
  }
}

export const instance = new GitHub();
