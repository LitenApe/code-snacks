import { Landmarks } from './landmarks';
import { Link } from '@remix-run/react';

export function Navigation(): JSX.Element {
  return (
    <nav id={Landmarks.NAVBAR} tabIndex={-1}>
      <ul>
        <li>
          <Link prefetch="intent" to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
