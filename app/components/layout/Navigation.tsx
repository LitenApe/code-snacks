import { Link } from 'remix';

export function Navigation() {
  return (
    <nav id="main-navigation-bar" tabIndex={-1}>
      <ul>
        <li>
          <Link prefetch="intent" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link prefetch="intent" to="/archive">
            Archive
          </Link>
        </li>
      </ul>
    </nav>
  );
}
