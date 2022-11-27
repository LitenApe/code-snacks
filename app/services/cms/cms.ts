import { Content, Frontmatter, Source } from './domain';
import { isFulfilledPromise, sortByDate } from './helpers';

import type { Logger } from '~/services/logger';
import type { Processor } from '~/services/text_processor';
import { TextProcessor } from '~/services/text_processor';
import { getLogger } from '~/services/logger';
import { source } from './sources';

class CMS {
  #logger: Logger;

  #src: Source;

  #processor: Processor;

  constructor(src: Source) {
    this.#logger = getLogger('CMS');
    this.#src = src;
    this.#processor = TextProcessor;
  }

  async getPosts(): Promise<Array<Frontmatter>> {
    this.#logger.trace('Retrieving posts');
    const rawPosts = await this.#src.getPosts();

    const posts = rawPosts.map(async ({ id, content }) => ({
      id,
      frontmatter: await this.#processor.getFrontmatter(content),
    }));

    const resolvedPosts = await Promise.allSettled(posts);

    return resolvedPosts
      .filter(isFulfilledPromise)
      .map(({ value }) => value)
      .sort(sortByDate);
  }

  async getPost(id: string): Promise<Content> {
    this.#logger.trace(`Retrieving post with [id=${id}]`);

    try {
      const post = await this.#src.getPost(id);
      return {
        id,
        ...this.#processor.getContent(post.content),
      };
    } catch (err) {
      this.#logger.error(
        `Unable to retrieve post with [id=${id}] due to [error=${err}]`,
      );
      throw new Error(`Unable to retrieve post with [id=${id}]`);
    }
  }
}

export const instance = new CMS(source);
