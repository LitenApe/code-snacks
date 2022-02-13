import { Landmarks } from '~/lib/landmarks';

export function SkipLinks() {
  return (
    <nav>
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
