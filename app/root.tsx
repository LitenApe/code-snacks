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
import { auth, getCookie } from './lib/cookie';

import { CatchBoundary as KnownExceptionBoundary } from './features/CatchBoundary';
import { Layout } from './features/Layout';
import type { MetaFunction } from 'remix';
import { RootDataProvider } from './features/RootDataContext';
import { ErrorBoundary as UnknownExceptionBoundary } from './features/ErrorBoundary';

interface Data {
  readonly authCookie: Record<string, unknown>;
}

export const meta: MetaFunction = () => ({ title: 'Tech Snacks' });

export const loader: LoaderFunction = async ({ request }): Promise<Data> => {
  const cookie = await getCookie(request, auth);
  return {
    authCookie: cookie,
  };
};

export default function App(): JSX.Element {
  const data = useLoaderData<Data>();
  const { authCookie } = data;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootDataProvider authCookie={authCookie}>
          <Layout>
            <Outlet />
          </Layout>
        </RootDataProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const data = useLoaderData<Data>();
  const { authCookie } = data;

  return (
    <RootDataProvider authCookie={authCookie}>
      <KnownExceptionBoundary />
    </RootDataProvider>
  );
}

export function ErrorBoundary(props: { error: Error }) {
  const { error } = props;

  const data = useLoaderData<Data>();
  const { authCookie } = data;

  return (
    <RootDataProvider authCookie={authCookie}>
      <UnknownExceptionBoundary error={error} />
    </RootDataProvider>
  );
}
