import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { Landmarks } from './landmarks';

enum NAVIGATION_MODE {
  KEYBOARD,
  MOUSE,
}

function useViewController() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<NAVIGATION_MODE | null>(null);

  const updateNavigationMode = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (event.type === 'mousedown' && mode !== NAVIGATION_MODE.MOUSE) {
        setMode(NAVIGATION_MODE.MOUSE);
      } else if (
        event.type === 'keydown'
        && mode !== NAVIGATION_MODE.KEYBOARD
      ) {
        setMode(NAVIGATION_MODE.KEYBOARD);

        // focus first element in skiplink list
        if ((event as KeyboardEvent).key === 'Tab') {
          containerRef.current?.focus();
        }
      }
    },
    [mode, setMode, containerRef.current],
  );

  useEffect(() => {
    document.addEventListener('keydown', updateNavigationMode);
    document.addEventListener('mousedown', updateNavigationMode);

    return () => {
      document.removeEventListener('keydown', updateNavigationMode);
      document.removeEventListener('mousedown', updateNavigationMode);
    };
  }, [updateNavigationMode]);

  return { ref: containerRef };
}

export function SkipLinks(): JSX.Element {
  const { ref } = useViewController();

  return (
    <div ref={ref} id="skip-links" aria-label="skip-links" tabIndex={-1}>
      <ul>
        <li>
          <a href={`#${Landmarks.NAVBAR}`}>Navigation bar</a>
        </li>
        <li>
          <a href={`#${Landmarks.MAIN}`}>Main content</a>
        </li>
        <li>
          <a href={`#${Landmarks.FOOTER}`}>Footer</a>
        </li>
      </ul>
    </div>
  );
}
