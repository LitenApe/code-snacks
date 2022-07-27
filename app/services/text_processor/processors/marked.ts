import { ContentProcessor } from '../domain';
import hljs from 'highlight.js/lib/common';
import { marked } from 'marked';

export class Marked implements ContentProcessor {
  #options = {
    highlight: (code: string): string => {
      const { value } = hljs.highlightAuto(code);
      return value;
    },
  };

  getContent(content: string): string {
    return marked.setOptions(this.#options).parse(content);
  }
}
