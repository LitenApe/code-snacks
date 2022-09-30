import { useCallback, useEffect, useState } from 'react';

import { debounce } from 'dirty-kitchen/lib/debounce';
import { useTransition } from '@remix-run/react';

function useViewController(): { visible: boolean } {
  const [visible, setVisible] = useState(false);
  const debounced = useCallback(debounce(setVisible, 500), [setVisible]);

  const { state } = useTransition();

  useEffect(() => {
    debounced(state === 'loading');
  }, [state, debounced]);

  return {
    visible,
  };
}

export function Loading(): JSX.Element | null {
  const { visible } = useViewController();

  if (!visible) {
    return null;
  }

  return (
    <p role="alert" className="loading-indicator">
      Loading...
    </p>
  );
}
