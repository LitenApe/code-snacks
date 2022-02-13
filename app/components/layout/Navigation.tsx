import { Landmarks } from '~/lib/landmarks';
import { Link } from 'remix';
import { Routes } from '~/lib/routes';

interface Props {
  readonly isAuthenticated: boolean;
}

export function Navigation(props: Props): JSX.Element {
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
        {!props.isAuthenticated && (
          <li>
            <Link prefetch="intent" to={Routes.SIGNIN}>
              Sign In
            </Link>
          </li>
        )}
        {props.isAuthenticated && (
          <li>
            <Link prefetch="intent" to={Routes.SIGNOUT}>
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
