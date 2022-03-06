import { Footer } from '../components/layout/Footer';
import { Main } from '../components/layout/Main';
import { Navigation } from '../components/layout/Navigation';
import { PropsWithChildren } from 'react';
import { SkipLinks } from '../components/SkipLinks';

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
