import type { Content, ContentProcessor } from '../domain';

import { GrayMatter } from './gray_matter';

class FakeProcessor implements ContentProcessor {
  async getContent(_content: string): Promise<Content> {
    throw new Error('Not Implemented');
  }
}

export const frontmatterProcessor = new GrayMatter();
export const contentProcessor = new FakeProcessor();
