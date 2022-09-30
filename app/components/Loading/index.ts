import { LinksFunction } from '@remix-run/node';
import stylesheet from './loading.css';

export { Loading } from './Loading';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: stylesheet,
  },
];
