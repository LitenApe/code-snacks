import { Landmarks } from './landmarks';
import type { PropsWithChildren } from 'react';

export function Main(props: PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;

  return (
    <main id={Landmarks.MAIN} tabIndex={-1}>
      {children}
    </main>
  );
}
