import type { Content, Frontmatter, Processor } from '../domain';

class FakeProcessor implements Processor {
  async getFrontmatter(_content: string): Promise<Frontmatter> {
    throw new Error('Not implemented');
  }

  async getContent(_content: string): Promise<Content> {
    throw new Error('Not Implemented');
  }
}

export const processor = new FakeProcessor();
