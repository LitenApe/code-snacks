import * as React from 'react';

export interface RootContextData {
  readonly isAuthenticated: boolean;
}

export const RootDataContext = React.createContext<RootContextData | null>(
  null,
);
