import { Landmarks } from '~/lib/landmarks';
import { PropsWithChildren } from 'react';

export function Main(props: PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;

  return (
    <main id={Landmarks.MAIN} tabIndex={-1}>
      {children}
    </main>
  );
}
