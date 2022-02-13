import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

import { Footer } from './components/layout/Footer';
import { CatchBoundary as KnownExceptionBoundary } from './features/CatchBoundary';
import type { MetaFunction } from 'remix';
import { Navigation } from './components/layout/Navigation';
import { SkipLinks } from './components/SkipLinks';
import { ErrorBoundary as UnknownExceptionBoundary } from './features/ErrorBoundary';

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export default function App() {
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
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export const CatchBoundary = KnownExceptionBoundary;

export const ErrorBoundary = UnknownExceptionBoundary;
