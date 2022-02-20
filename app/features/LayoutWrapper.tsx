import { Footer } from '../components/layout/Footer';
import { Main } from '../components/layout/Main';
import { Navigation } from '../components/layout/Navigation';
import { PropsWithChildren } from 'react';
import { SkipLinks } from '../components/SkipLinks';

interface Props {
  readonly texts: any;
  readonly isAuthenticated?: boolean;
}

export function LayoutWrapper(props: PropsWithChildren<Props>): JSX.Element {
  const { children, texts, isAuthenticated } = props;

  return (
    <>
      <SkipLinks />
      <Navigation isAuthenticated={isAuthenticated || false} />
      <Main>{children}</Main>
      <Footer texts={texts.footer} />
    </>
  );
}
