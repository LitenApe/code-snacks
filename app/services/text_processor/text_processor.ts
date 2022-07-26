import {
  Content,
  ContentProcessor,
  Frontmatter,
  FrontmatterProcessor,
  Processor,
} from './domain';
import { contentProcessor, frontmatterProcessor } from './processors';

import { Logger } from '../logger';

class TextProcessor implements Processor {
  #logger: Logger;

  #frontmatterProcessor: FrontmatterProcessor;

  #contentProcessor: ContentProcessor;

  constructor(fProcessor: FrontmatterProcessor, cProcessor: ContentProcessor) {
    this.#logger = new Logger('TextProcessor');

    this.#frontmatterProcessor = fProcessor;
    this.#contentProcessor = cProcessor;
  }

  async getFrontmatter(rawContent: string): Promise<Frontmatter> {
    const frontmatter = await this.#frontmatterProcessor.getFrontmatter(
      rawContent,
    );

    const { title, date, ...rest } = frontmatter;

    if (date === undefined || title === undefined) {
      this.#logger.warn(
        `Attempted to extract incomplete frontmatter. [frontmatter=${frontmatter}]`,
      );
      throw new Error(
        'Attempted to extract incomplete frontmatter. Frontmatters must include a title and date!',
      );
    }

    return {
      title,
      date,
      ...rest,
    };
  }

  async getContent(rawContent: string): Promise<Content> {
    const content = await this.#contentProcessor.getContent(rawContent);

    this.#logger.debug(
      `Extracted frontmatter with [keys=${Object.keys(
        content.frontmatter,
      )}] and content of [length=${content.content.length}]`,
    );

    return content;
  }
}

export const instance = new TextProcessor(
  frontmatterProcessor,
  contentProcessor,
);
