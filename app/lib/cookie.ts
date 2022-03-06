import type { Cookie } from 'remix';
import { createCookie } from 'remix';

export const auth = createCookie('auth', {
  path: '/',
  maxAge: 604_800,
  sameSite: 'strict',
  secrets: [process.env.COOKIE_SECRET as string],
  httpOnly: true,
});

export async function getCookie<T = any>(
  request: Request,
  cookie: Cookie,
): Promise<T> {
  const httpCookie = request.headers.get('Cookie');
  const parsedCookie = (await cookie.parse(httpCookie)) || {};
  return parsedCookie;
}
