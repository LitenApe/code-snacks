import { Content, Frontmatter, Source } from './domain';
import { isFulfilledPromise, sortByDate } from './helpers';

import { Logger } from '../logger';
import { TextProcessor } from '../text_processor';
import { source } from './sources';

class CMS {
  #logger;

  #src;

  #processor;

  constructor(src: Source) {
    this.#logger = new Logger('CMS');
    this.#src = src;
    this.#processor = TextProcessor;
  }

  async getPosts(): Promise<Array<Frontmatter>> {
    this.#logger.debug('Retrieving posts');
    const rawPosts = await this.#src.getPosts();

    const posts = rawPosts.map(async (post) => ({
      id: post.id,
      frontmatter: await this.#processor.getFrontmatter(post.content),
    }));

    const resolvedPosts = await Promise.allSettled(posts);

    return resolvedPosts
      .filter(isFulfilledPromise)
      .map(({ value }) => value)
      .sort(sortByDate);
  }

  async getPost(id: string): Promise<Content> {
    this.#logger.debug(`Retrieving post with [id=${id}]`);

    try {
      const post = await this.#src.getPost(id);
      return {
        id,
        ...this.#processor.getContent(post.content),
      };
    } catch (err) {
      this.#logger.warn(
        `Unable to retrieve post with [id=${id}] due to [error=${err}]`,
      );
      throw new Error(`Unable to extract content with [id=${id}]`);
    }
  }
}

export const instance = new CMS(source);
