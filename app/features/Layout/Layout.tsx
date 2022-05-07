import { Footer } from './Footer';
import { Main } from './Main';
import { Navigation } from './Navigation';
import type { PropsWithChildren } from 'react';
import { SkipLinks } from './SkipLinks';

export function Layout(props: PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  return (
    <>
      <SkipLinks />
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
