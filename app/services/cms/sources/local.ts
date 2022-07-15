import { readFile, readdir } from 'fs/promises';

import { Logger } from '~/services/logger';
import { Source } from '../domain';
import { join } from 'path';

class Local implements Source {
  #logger: Logger;

  constructor() {
    this.#logger = new Logger('CMS:Local');
  }

  async getPost(id: string): Promise<unknown> {
    const content = await this.retrieveContent(id);
    return content;
  }

  async getPosts(): Promise<Array<unknown>> {
    const allContent = await this.retrieveAllContent();
    return allContent;
  }

  private async retrieveAllContent() {
    const location = join(__dirname, '../app/content/posts');
    const filenames = await readdir(location);

    this.#logger.debug(`Retrieved [filenames=(${filenames.join(', ')})]`);

    const filecontents = filenames
      .filter((filename) => filename.includes('.md'))
      .map((filename) => {
        const fileLocation = join(location, filename);
        return readFile(fileLocation, {
          encoding: 'utf-8',
          flag: 'r',
        });
      });

    const result = await Promise.all(filecontents);

    const nameAndContent = filenames.map((filename, index) => ({
      name: filename.substring(0, filename.indexOf('.md')),
      content: result[index],
    }));

    this.#logger.debug(
      `Retrieved content from [length=${nameAndContent.length}] files`,
    );

    return nameAndContent;
  }

  private async retrieveContent(id: string) {
    const allContent = await this.retrieveAllContent();
    const content = allContent.find(({ name }) => name === id);
    return content;
  }
}

export const instance = new Local();
