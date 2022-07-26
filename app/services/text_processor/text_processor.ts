import { Content, Frontmatter, Processor } from './domain';

import { Logger } from '../logger';
import { processor } from './processors';

class TextProcessor implements Processor {
  #logger: Logger;

  #processor: Processor;

  constructor(textProcessor: Processor) {
    this.#logger = new Logger('TextProcessor');
    this.#processor = textProcessor;
  }

  async getFrontmatter(rawContent: string): Promise<Frontmatter> {
    const frontmatter = await this.#processor.getFrontmatter(rawContent);

    this.#logger.debug(
      `Extracted frontmatter with [keys=${Object.keys(frontmatter).length}]`,
    );

    return frontmatter;
  }

  async getContent(rawContent: string): Promise<Content> {
    const content = await this.#processor.getContent(rawContent);

    this.#logger.debug(
      `Extracted frontmatter with [keys=${Object.keys(
        content.frontmatter,
      )}] and content of [length=${content.content.length}]`,
    );

    return content;
  }
}

export const instance = new TextProcessor(processor);
