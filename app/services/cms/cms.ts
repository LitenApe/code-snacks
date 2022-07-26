import { GitHub, Local } from './sources';

import { Logger } from '../logger';
import type { Source } from './domain';

class CMS {
  #logger: Logger;

  #src: Source;

  constructor(src: Source) {
    this.#logger = new Logger('CMS');
    this.#src = src;
  }

  async getPosts(): Promise<Array<unknown>> {
    this.#logger.debug('Retrieving posts');
    return this.#src.getPosts();
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

const source = process.env.NODE_ENV === 'development' ? Local : GitHub;
export const instance = new CMS(source);
