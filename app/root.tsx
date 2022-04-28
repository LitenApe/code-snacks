import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { CatchBoundary as KnownExceptionBoundary } from './features/CatchBoundary';
import { Layout } from './features/Layout';
import type { MetaFunction } from '@remix-run/node';
import { ErrorBoundary as UnknownExceptionBoundary } from './features/ErrorBoundary';

export const meta: MetaFunction = () => ({ title: 'Tech Snacks' });

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/holiday.css@0.9.8"
        />
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

export function CatchBoundary() {
  return <KnownExceptionBoundary />;
}

export function ErrorBoundary(props: { error: Error }) {
  const { error } = props;
  return <UnknownExceptionBoundary error={error} />;
}
