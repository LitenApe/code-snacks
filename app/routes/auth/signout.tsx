import { auth, getCookie } from '~/lib/cookie';

import type { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const cookie = await getCookie(request, auth);

  if (cookie.authorization !== true) {
    throw new Response('Access denied', { status: 401 });
  }

  cookie.authorization = null;

  return new Response(null, {
    headers: {
      'Set-Cookie': await auth.serialize(cookie, { maxAge: 0 }),
    },
  });
};

export default function SignOut(): JSX.Element {
  return (
    <>
      <h1>Succefully signed out</h1>
      <p>You have been successfully signed out</p>
    </>
  );
}
