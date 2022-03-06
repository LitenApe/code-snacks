import * as React from 'react';

import { isDefined } from '~/lib/isDefined';

interface ContextData {
  readonly isAuthenticated: boolean;
}

interface Props {
  readonly authCookie: Record<string, any>;
}

const context = React.createContext<ContextData | null>(null);

export function useRootData(): ContextData {
  const data = React.useContext(context);

  if (!isDefined(data)) {
    throw new Error('`useRootData` must be wrapped by a `RootDataProvider`');
  }

  return data;
}

export function RootDataProvider(
  props: React.PropsWithChildren<Props>,
): JSX.Element {
  const { children, authCookie } = props;
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    setIsAuthenticated(() => authCookie.authorization);
  }, [authCookie.authorization]);

  const values = React.useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated],
  );

  return <context.Provider value={values}>{children}</context.Provider>;
}
