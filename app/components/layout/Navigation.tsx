import { Landmarks } from '~/lib/landmarks';
import { Link } from 'remix';
import { Routes } from '~/lib/routes';
import { useRootData } from '~/features/RootDataContext/RootDataContext';

export function Navigation(): JSX.Element {
  const rootData = useRootData();
  const { isAuthenticated } = rootData;

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
        <li>
          <Link prefetch="intent" to={Routes.DRAFTS}>
            Drafts
          </Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link prefetch="intent" to={Routes.SIGNIN}>
              Sign In
            </Link>
          </li>
        )}
        {isAuthenticated && (
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
