import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

import { CatchBoundary as KnownExceptionBoundary } from './features/CatchBoundary';
import { LayoutWrapper } from './features/LayoutWrapper';
import type { MetaFunction } from 'remix';
import { ErrorBoundary as UnknownExceptionBoundary } from './features/ErrorBoundary';

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

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
        <LayoutWrapper>
          <Outlet />
        </LayoutWrapper>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export const CatchBoundary = KnownExceptionBoundary;
export const ErrorBoundary = UnknownExceptionBoundary;
