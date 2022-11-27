import { Frontmatter, FrontmatterProcessor } from '../domain';

import type { Logger } from '~/services/logger';
import { getLogger } from '~/services/logger';
import matter from 'gray-matter';

export class GrayMatter implements FrontmatterProcessor {
  #logger: Logger;

  constructor() {
    this.#logger = getLogger('TextProcessor:GrayMatter');
  }

  getFrontmatter(content: string): Partial<Frontmatter> {
    this.#logger.trace('Extracting frontmatter from content');

    const { data } = matter(content);
    return data;
  }

  getFrontmatterAndRawContent(rawContent: string): {
    frontmatter: Partial<Frontmatter>;
    content: string;
  } {
    this.#logger.trace('Extracting frontmatter and content');

    const { data, content } = matter(rawContent);
    return {
      content,
      frontmatter: data,
    };
  }
}
