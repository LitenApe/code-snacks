import { readFile, readdir } from 'fs/promises';

import { Logger } from '~/services/logger';
import { Source } from '../domain';
import { join } from 'path';

type RawContent = {
  name: string;
  content: string;
};

class Local implements Source {
  #logger: Logger;

  #content_location = process.env.CONTENT_LOCATION;

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

  private async retrieveAllContent(): Promise<Array<RawContent>> {
    if (this.#content_location === undefined) {
      this.#logger.error(
        'Content locations is undefined, unable to retrieve content',
      );
      throw new Error(
        'Undefined content location! Make sure that environment variables are loaded into the system correctly',
      );
    }

    const location = join(__dirname, '..', this.#content_location);
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
      name: filename.substring(0, filename.indexOf('.')),
      content: result[index],
    }));

    this.#logger.debug(
      `Retrieved content from [length=${nameAndContent.length}] files`,
    );

    return nameAndContent;
  }

  private async retrieveContent(id: string): Promise<RawContent | undefined> {
    const allContent = await this.retrieveAllContent();
    const content = allContent.find(({ name }) => name === id);
    return content;
  }
}

export const instance = new Local();
