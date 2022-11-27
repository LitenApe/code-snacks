import {
  Content,
  ContentProcessor,
  Frontmatter,
  FrontmatterProcessor,
  Processor,
} from './domain';
import { contentProcessor, frontmatterProcessor } from './processors';

import type { Logger } from '../logger';
import { getLogger } from '../logger';
import { isValidFrontmatter } from './helpers';

class TextProcessor implements Processor {
  #logger: Logger;

  #fProcessor: FrontmatterProcessor;

  #cProcessor: ContentProcessor;

  constructor(fProcessor: FrontmatterProcessor, cProcessor: ContentProcessor) {
    this.#logger = getLogger('TextProcessor');

    this.#fProcessor = fProcessor;
    this.#cProcessor = cProcessor;
  }

  getFrontmatter(rawContent: string): Frontmatter {
    const frontmatter = this.#fProcessor.getFrontmatter(rawContent);

    if (!isValidFrontmatter(frontmatter)) {
      this.#logger.warn(
        `Attempted to extract incomplete frontmatter. [frontmatter=${JSON.stringify(
          frontmatter,
        )}]`,
      );
      throw new Error(
        'Attempted to extract incomplete frontmatter. Frontmatters must include a title and date!',
      );
    }

    return frontmatter;
  }

  getContent(rawContent: string): Content {
    const { frontmatter, content } = this.#fProcessor.getFrontmatterAndRawContent(rawContent);

    if (content.length === 0) {
      this.#logger.warn('Found no content to process over to HTML');
      throw new Error('Attempted to process empty content!');
    }

    const processedContent = this.#cProcessor.getContent(content);

    if (!isValidFrontmatter(frontmatter)) {
      this.#logger.warn(
        `Attempted to extract incomplete frontmatter. [frontmatter=${JSON.stringify(
          frontmatter,
        )}]`,
      );
      throw new Error(
        'Attempted to extract incomplete frontmatter. Frontmatters must include a title and date!',
      );
    }

    return {
      frontmatter,
      content: processedContent,
    };
  }
}

export const instance = new TextProcessor(
  frontmatterProcessor,
  contentProcessor,
);
