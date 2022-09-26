import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import { createElement, forwardRef } from 'react';

type Props = {
  readonly content: string;
} & ComponentPropsWithRef<'div'>;

export const DangerousHTML = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { content, ...rest } = props;
    return createElement('div', {
      ...rest,
      ref,
      dangerouslySetInnerHTML: { __html: content },
    });
  },
);
