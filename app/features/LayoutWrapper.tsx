import { Footer } from '../components/layout/Footer';
import { Main } from '../components/layout/Main';
import { Navigation } from '../components/layout/Navigation';
import { PropsWithChildren } from 'react';
import { SkipLinks } from '../components/SkipLinks';

export function LayoutWrapper(props: PropsWithChildren<unknown>): JSX.Element {
  return (
    <>
      <SkipLinks />
      <Navigation />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
}
