import { lstat, readFile, readdir } from 'fs/promises';

import { Logger } from '~/services/logger';
import { Source } from '../domain';
import { join } from 'path';

type RawContent = {
  id: string;
  content: string;
};

class Local implements Source {
  #logger: Logger;

  #content_location: string;

  constructor() {
    this.#logger = new Logger('CMS:Local');

    const contentDirLocation = process.env.CONTENT_LOCATION;

    if (typeof contentDirLocation === 'undefined') {
      throw new Error(
        'Undefined content location! Make sure that environment variables are loaded into the system correctly',
      );
    }

    this.#content_location = contentDirLocation;
  }

  async getPost(id: string): Promise<unknown> {
    const content = await this.readFileContent(this.#content_location, id);
    return content;
  }

  async getPosts(): Promise<Array<unknown>> {
    const allContent = await this.retrieveAllContent();
    return allContent;
  }

  private async retrieveAllContent(): Promise<Array<RawContent>> {
    const filesAndFolders = await this.readContentDirectory(
      this.#content_location,
    );

    const fileContents = filesAndFolders.map(async (name) => ({
      id: name,
      content: await this.readFileContent(this.#content_location, name),
    }));

    const retrievedFileContents = await Promise.all(fileContents);

    return retrievedFileContents;
  }

  private async readContentDirectory(dirpath: string): Promise<Array<string>> {
    const location = join(__dirname, '..', dirpath);
    const filesAndFolders = await readdir(location);
    this.#logger.debug(`Retrieved [filenames=(${filesAndFolders.join(', ')})]`);
    return filesAndFolders;
  }

  private async exist(path: string): Promise<boolean> {
    try {
      await lstat(path);
      return true;
    } catch (ignored) {
      return false;
    }
  }

  private async readFileContent(
    dirpath: string,
    filename: string,
  ): Promise<string> {
    const contentLocation = join(__dirname, '..', dirpath, filename);

    this.#logger.debug(
      `Retrieving content from [dirpath=${dirpath}] and [filename=${filename}]`,
    );

    if (
      !(await this.exist(contentLocation))
      && !(await this.exist(`${contentLocation}.md`))
    ) {
      throw new Error(
        `Invalid attempt to read unknown content of [filename=${filename}]`,
      );
    }

    const contentPath = (await this.exist(contentLocation))
      ? contentLocation
      : `${contentLocation}.md`;
    const fileStats = await lstat(contentPath);

    if (fileStats.isDirectory()) {
      return this.loadContent(join(contentPath, 'index.md'));
    }

    return this.loadContent(contentPath);
  }

  private async loadContent(path: string): Promise<string> {
    return readFile(path, {
      encoding: 'utf-8',
      flag: 'r',
    });
  }
}

export const instance = new Local();
