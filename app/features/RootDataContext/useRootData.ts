import * as React from 'react';

import { RootContextData, RootDataContext } from './RootDataContext';

import { isDefined } from '~/lib/isDefined';

export function useRootData(): RootContextData {
  const data = React.useContext(RootDataContext);

  if (!isDefined(data)) {
    throw new Error('`useRootData` must be wrapped by a `RootDataProvider`');
  }

  return data;
}
