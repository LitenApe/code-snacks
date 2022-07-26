import { Frontmatter, FrontmatterProcessor } from '../domain';

import { Logger } from '~/services/logger';
import matter from 'gray-matter';

export class GrayMatter implements FrontmatterProcessor {
  #logger;

  constructor() {
    this.#logger = new Logger('TextProcessor:GrayMatter');
  }

  async getFrontmatter(content: string): Promise<Partial<Frontmatter>> {
    this.#logger.debug(
      `Extracting frontmatter from content of [length=${content.length}]`,
    );

    const { data } = matter(content);
    return data;
  }
}
