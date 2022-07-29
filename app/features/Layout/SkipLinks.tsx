import { Landmarks } from './landmarks';

export function SkipLinks(): JSX.Element {
  return (
    <nav id="skip-links">
      <ul>
        <li>
          <a href={`#${Landmarks.NAVBAR}`}>Navigation bar</a>
        </li>
        <li>
          <a href={`#${Landmarks.MAIN}`}>Main content</a>
        </li>
        <li>
          <a href={`#${Landmarks.FOOTER}`}>Footer</a>
        </li>
      </ul>
    </nav>
  );
}
