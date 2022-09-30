import { LinksFunction } from '@remix-run/node';
import stylesheet from './layout.css';

export { Footer } from './Footer';
export { Navigation } from './Navigation';
export { SkipLinks } from './SkipLinks';
export { Main } from './Main';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: stylesheet,
  },
];
