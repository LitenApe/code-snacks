export type Frontmatter = Record<string, any>;
export type Content = {
  frontmatter: Frontmatter;
  content: string;
};

export interface Processor {
  getFrontmatter: (content: string) => Promise<Frontmatter>;
  getContent: (content: string) => Promise<Content>;
}
