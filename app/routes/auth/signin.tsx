import { ActionFunction, redirect, useActionData } from 'remix';
import { auth, getCookie } from '~/lib/cookie';

import { Form } from 'remix';
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
      errors['identifier'] = 'Identifier is required';
    }

    if (payload.get('password') === null) {
      errors['password'] = 'Password is required';
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

export default function SignIn() {
  const action = useActionData();

  return (
    <>
      <h1>Sign In</h1>
      <Form method="post">
        <label htmlFor="idetifier">Identifier</label>
        <input id="identifier" name="identifier" type="text" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <div>{JSON.stringify(action)}</div>

        <button type="submit">Sign In</button>
      </Form>
    </>
  );
}
