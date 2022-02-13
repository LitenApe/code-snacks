import { Footer } from '../components/layout/Footer';
import { Main } from '../components/layout/Main';
import { Navigation } from '../components/layout/Navigation';
import { PropsWithChildren } from 'react';
import { SkipLinks } from '../components/SkipLinks';

interface Props {
  readonly isAuthenticated?: boolean;
}

export function LayoutWrapper(props: PropsWithChildren<Props>): JSX.Element {
  return (
    <>
      <SkipLinks />
      <Navigation isAuthenticated={props.isAuthenticated || false} />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
}
