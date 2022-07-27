import { Frontmatter } from '../domain';

function isValidDate(date: any): date is Date {
  if (!(date instanceof Date)) {
    return false;
  }

  if (Number.isNaN(date.getMilliseconds())) {
    return false;
  }

  return true;
}

export function isValidFrontmatter(
  frontmatter: Partial<Frontmatter>,
): frontmatter is Frontmatter {
  if (typeof frontmatter.title === 'undefined') {
    return false;
  }

  if (!isValidDate(frontmatter.date)) {
    return false;
  }

  return true;
}
