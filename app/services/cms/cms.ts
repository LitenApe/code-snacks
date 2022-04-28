import { Logger } from '../logger';

class CMS {
  #logger;

  constructor() {
    this.#logger = new Logger('CMS');
  }

  async getPosts(): Promise<Array<any>> {
    this.#logger.debug('Retrieving posts');
    return [];
  }
}

export const instance = new CMS();
