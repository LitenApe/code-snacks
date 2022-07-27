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
  getFrontmatter: (content: string) => Partial<Frontmatter>;
  getFrontmatterAndRawContent: (content: string) => {
    frontmatter: Partial<Frontmatter>;
    content: string;
  };
}

export interface ContentProcessor {
  getContent: (content: string) => string;
}
export interface Processor {
  getFrontmatter: (content: string) => Frontmatter;
  getContent: (content: string) => Content;
}
