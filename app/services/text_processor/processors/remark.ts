import { Content, Frontmatter, Processor } from '../domain';

class Remark implements Processor {
  getFrontmatter(_content: string): Frontmatter {
    throw new Error('Not implemented');
  }

  getContent(_content: string): Content {
    throw new Error('Not implemented');
  }
}

export const instance = new Remark();
