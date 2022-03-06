import React from 'react';

interface Props {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading<T extends keyof JSX.IntrinsicElements = 'h1'>(
  props: Props & React.ComponentProps<T>,
): JSX.Element {
  const { level, ...rest } = props;
  // eslint-disable-next-line no-shadow
  const Heading = `h${level}`;

  return <Heading {...rest} />;
}
