import { Landmarks } from '~/lib/landmarks';
import { Link } from 'remix';
import { Routes } from '~/lib/routes';
import { useRootData } from '~/features/RootDataContext';

const authenticatedRoutes = [
  {
    uri: Routes.DRAFTS,
    label: 'Drafts',
  },
  {
    uri: Routes.SIGNOUT,
    label: 'Sign Out',
  },
];

const unauthenticatedRoutes = [
  {
    uri: Routes.SIGNIN,
    label: 'Sign In',
  },
];

export function Navigation(): JSX.Element {
  const { isAuthenticated } = useRootData();

  const additionalRoutes = isAuthenticated
    ? authenticatedRoutes
    : unauthenticatedRoutes;

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
        {additionalRoutes.map(({ uri, label }) => (
          <li key={`navigation-route-${isAuthenticated}-${uri}`}>
            <Link prefetch="intent" to={uri}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
