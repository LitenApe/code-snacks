import { ContentProcessor } from '../domain';
import { marked } from 'marked';

export class Marked implements ContentProcessor {
  getContent(content: string): string {
    return marked.parse(content);
  }
}
