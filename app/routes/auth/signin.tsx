// eslint-disable-next-line object-curly-newline
import { Form, redirect, useActionData } from 'remix';
import { auth, getCookie } from '~/lib/cookie';

import type { ActionFunction } from 'remix';
import { Routes } from '~/lib/routes';

interface ErrorResponse {
  identifier?: string;
  password?: string;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ErrorResponse | ReturnType<typeof redirect>> => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }

  const payload = await request.formData();

  if (payload.get('identifier') === null || payload.get('password') === null) {
    const errors: ErrorResponse = {};

    if (payload.get('identifier') === null) {
      errors.identifier = 'Identifier is required';
    }

    if (payload.get('password') === null) {
      errors.password = 'Password is required';
    }

    return errors;
  }

  const cookie = await getCookie(request, auth);
  cookie.authorization = true;

  return redirect(Routes.HOME, {
    headers: {
      'Set-Cookie': await auth.serialize(cookie),
    },
  });
};

export default function SignIn(): JSX.Element {
  const data = useActionData();

  return (
    <>
      <h1>Sign In</h1>
      <Form method="post">
        <label htmlFor="idetifier">
          Identifier
          <input id="identifier" name="identifier" type="text" required />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" name="password" type="password" required />
        </label>

        <div>{JSON.stringify(data)}</div>

        <button type="submit">Sign In</button>
      </Form>
    </>
  );
}
