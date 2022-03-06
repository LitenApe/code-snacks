import * as React from 'react';

interface Props {
  readonly content: string;
}

export function DangerousHTML(
  props: Props & React.ComponentPropsWithoutRef<'div'>,
): JSX.Element {
  const { content, ...rest } = props;
  return React.createElement('div', {
    ...rest,
    dangerouslySetInnerHTML: { __html: content },
  });
}
