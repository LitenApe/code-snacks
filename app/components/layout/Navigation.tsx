import { Landmarks } from '~/lib/landmarks';
import { Link } from 'remix';
import { Routes } from '~/lib/routes';

export function Navigation() {
  return (
    <nav id={Landmarks.NAVBAR} tabIndex={-1}>
      <ul>
        <li>
          <Link prefetch="intent" to={Routes.HOME}>
            Home
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to={Routes.ARCHIVE}>
            Archive
          </Link>
        </li>
      </ul>
    </nav>
  );
}
