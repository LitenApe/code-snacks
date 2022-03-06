import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';
import type { MetaFunction } from 'remix';
import { auth, getCookie } from './lib/cookie';

import { CatchBoundary as KnownExceptionBoundary } from './features/CatchBoundary';
import { Layout } from './features/Layout';
import { ErrorBoundary as UnknownExceptionBoundary } from './features/ErrorBoundary';

export const meta: MetaFunction = () => ({ title: 'New Remix App' });

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = await getCookie(request, auth);

  return {
    isAuthenticated: cookie.authorization === true,
  };
};

export default function App(): JSX.Element {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout isAuthenticated={data.isAuthenticated}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export const CatchBoundary = KnownExceptionBoundary;
export const ErrorBoundary = UnknownExceptionBoundary;
