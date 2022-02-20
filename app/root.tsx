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
import { LayoutWrapper } from './features/LayoutWrapper';
import type { MetaFunction } from 'remix';
import { ErrorBoundary as UnknownExceptionBoundary } from './features/ErrorBoundary';
import { CMS } from './service/cms';

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export const loader: LoaderFunction = async ({ request }) => {
  const cms = new CMS();
  const cookie = await getCookie(request, auth);

  const footer = await cms.getFooter();

  return {
    isAuthenticated: cookie.authorization === true,
    texts: {
      footer,
    },
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
        <LayoutWrapper
          texts={data.texts}
          isAuthenticated={data.isAuthenticated}
        >
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
