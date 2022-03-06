import type { Cookie } from 'remix';
import { createCookie } from 'remix';

export const auth = createCookie('auth', {
  path: '/',
  maxAge: 604_800,
  sameSite: 'strict',
});

export async function getCookie<T = any>(
  request: Request,
  cookie: Cookie,
): Promise<T> {
  const httpCookie = request.headers.get('Cookie');
  const parsedCookie = (await cookie.parse(httpCookie)) || {};
  return parsedCookie;
}
