import * as React from 'react';

import { RootDataContext } from './RootDataContext';

interface Props {
  readonly authCookie: Record<string, unknown>;
  readonly children: React.ReactNode;
}

export function RootDataProvider(props: Props): JSX.Element {
  const { children, authCookie } = props;
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    authCookie.authorization === true,
  );

  React.useEffect(() => {
    setIsAuthenticated(() => authCookie.authorization === true);
  }, [authCookie]);

  const values = React.useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated],
  );

  return (
    <RootDataContext.Provider value={values}>
      {children}
    </RootDataContext.Provider>
  );
}
