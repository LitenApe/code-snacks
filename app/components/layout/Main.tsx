import { Landmarks } from '~/lib/landmarks';
import { PropsWithChildren } from 'react';

export function Main(props: PropsWithChildren<unknown>): JSX.Element {
  return (
    <main id={Landmarks.MAIN} tabIndex={-1}>
      {props.children}
    </main>
  );
}
