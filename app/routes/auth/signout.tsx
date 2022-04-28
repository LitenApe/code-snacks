import { LoaderFunction, redirect } from "@remix-run/node";
import { auth, getCookie } from '~/lib/cookie';

import { Routes } from '~/lib/routes';

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const cookie = await getCookie(request, auth);

  if (cookie.authorization !== true) {
    throw redirect(Routes.SIGNIN, { status: 302 });
  }

  cookie.authorization = null;

  return redirect(Routes.HOME, {
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
