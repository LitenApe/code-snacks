import { Content, Frontmatter, Processor } from './domain';

import { Logger } from '../logger';
import { Remark } from './processors';

class TextProcessor implements Processor {
  #logger: Logger;

  #processor: Processor;

  constructor(processor: Processor) {
    this.#logger = new Logger('TextProcessor');
    this.#processor = processor;
  }

  getFrontmatter(rawContent: string): Frontmatter {
    const frontmatter = this.#processor.getFrontmatter(rawContent);

    this.#logger.debug(
      `Extracted frontmatter with [keys=${Object.keys(frontmatter).length}]`,
    );

    return frontmatter;
  }

  getContent(rawContent: string): Content {
    const content = this.#processor.getContent(rawContent);

    this.#logger.debug(
      `Extracted frontmatter with [keys=${Object.keys(
        content.frontmatter,
      )}] and content of [length=${content.content.length}]`,
    );

    return content;
  }
}

export const instance = new TextProcessor(Remark);
