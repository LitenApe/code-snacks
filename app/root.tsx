import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node';
import { Layout, links as layoutLinks } from '~/features/Layout';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export const meta: MetaFunction = () => ({ title: 'Tech Snacks' });

export const headers: HeadersFunction = () => ({
  'Cache-Control':
    'max-age=31556952, stale-while-revalidation=2592000, stale-if-error=1209600',
});

export const links: LinksFunction = () => [
  ...layoutLinks,
  {
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/holiday.css@0.9.8',
  },
];

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
