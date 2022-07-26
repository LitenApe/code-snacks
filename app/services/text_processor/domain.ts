export type Frontmatter = {
  title: string;
  date: Date;
  [key: string]: unknown;
};

export type Content = {
  frontmatter: Frontmatter;
  content: string;
};

export interface FrontmatterProcessor {
  getFrontmatter: (content: string) => Promise<Partial<Frontmatter>>;
}

export interface ContentProcessor {
  getContent: (content: string) => Promise<Content>;
}
export interface Processor extends FrontmatterProcessor, ContentProcessor {}
