import { Frontmatter } from '../domain';

export function sortByDate(a: Frontmatter, b: Frontmatter): number {
  return b.frontmatter.date.getTime() - a.frontmatter.date.getTime();
}
