import { Link } from 'remix';

export default function Archive(): JSX.Element {
  return (
    <>
      <h1>Archive</h1>
      <ul>
        <li>
          <Link to="/1">Test</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
      </ul>
    </>
  );
}
