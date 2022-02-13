import { Landmarks } from '~/lib/landmarks';

export function Footer(): JSX.Element {
  return (
    <footer id={Landmarks.FOOTER} tabIndex={-1}>
      <p>Made by monkeys, powered by bananas</p>
    </footer>
  );
}
