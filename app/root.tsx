import {
  Footer,
  Main,
  Navigation,
  SkipLinks,
  links as layoutLinks,
} from '~/components/Layout';
import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Loading, links as LoadingLinks } from '~/components/Loading';

import { CatchBoundary as KnownExceptionBoundary } from '~/components/CatchBoundary';
import { ErrorBoundary as UnknownExceptionBoundary } from '~/components/ErrorBoundary';

export const meta: MetaFunction = () => ({ title: 'Tech Snacks' });

export const headers: HeadersFunction = () => ({
  'Cache-Control':
    'max-age=31556952, stale-while-revalidation=2592000, stale-if-error=1209600',
});

export const links: LinksFunction = () => [
  ...layoutLinks(),
  ...LoadingLinks(),
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
        <SkipLinks />
        <Navigation />
        <Main>
          <Outlet />
        </Main>
        <Footer />
        <Loading />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return <KnownExceptionBoundary />;
}

export function ErrorBoundary(props: { error: Error }) {
  const { error } = props;
  return <UnknownExceptionBoundary error={error} />;
}
