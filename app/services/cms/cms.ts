import { Frontmatter, Source } from './domain';

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

    return (await Promise.allSettled(posts))
      .filter(
        (result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled',
      )
      .map(({ value }) => value);
  }

  async getPost(id: string): Promise<unknown> {
    this.#logger.debug(`Retrieving post with [id=${id}]`);

    try {
      const post = await this.#src.getPost(id);
      return post;
    } catch (err) {
      this.#logger.warn(`Unable to retrieve post with [id=${id}]`);
    }

    return undefined;
  }
}

export const instance = new CMS(source);
