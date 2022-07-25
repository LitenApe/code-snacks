export type Frontmatter = Record<string, any>;
export type Content = {
  frontmatter: Frontmatter;
  content: string;
};

export interface Processor {
  getFrontmatter: (content: string) => Frontmatter;
  getContent: (content: string) => Content;
}
