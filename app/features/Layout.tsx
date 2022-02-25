import { Footer } from '../components/layout/Footer';
import { Main } from '../components/layout/Main';
import { Navigation } from '../components/layout/Navigation';
import { PropsWithChildren } from 'react';
import { SkipLinks } from '../components/SkipLinks';

interface Props {
  readonly isAuthenticated?: boolean;
}

export function Layout(props: PropsWithChildren<Props>): JSX.Element {
  const { children, isAuthenticated } = props;

  return (
    <>
      <SkipLinks />
      <Navigation isAuthenticated={isAuthenticated || false} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
