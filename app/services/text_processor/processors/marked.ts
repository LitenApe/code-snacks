import { ContentProcessor } from '../domain';
import hljs from 'highlight.js/lib/common';
import { marked } from 'marked';

const options = {
  highlight: (code: string): string => {
    const { value } = hljs.highlightAuto(code);
    return value;
  },
  renderer: {
    link(href: string, _: string, text: string): string {
      const prefix = 'ghf://';
      if (!href.startsWith(prefix)) {
        return `<a href="${href}">${text}</a>`;
      }

      const linkWithoutPrefix = href.substring(prefix.length);
      return `<a href="${process.env.GITHUB_RAW_LOCATION}/${linkWithoutPrefix}">${text}</a>`;
    },
  },
};
marked.use(options);

export class Marked implements ContentProcessor {
  getContent(content: string): string {
    return marked.parse(content);
  }
}
