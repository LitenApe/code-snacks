export const files = `
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

export const file = `
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
