import { marked } from 'marked';

export function toHTML(content: string): string {
  const result = marked.parse(content, {
    breaks: true,
    gfm: true,
    headerIds: true,
  });
  return result;
}
