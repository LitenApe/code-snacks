/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import type { ErrorBoundaryComponent } from '@remix-run/node';
import { InternalServerError } from './InternalServerError';
import { Layout } from '../Layout';
import { Logger } from '~/services';

export const Container: ErrorBoundaryComponent = (props): JSX.Element => {
  const { error } = props;
  const { message, stack } = error;
  const logger = new Logger('ErrorBoundary');
  logger.error(`[message=${message}]`, `[stack=${stack}]`);
  return (
    <Layout>
      <InternalServerError />
    </Layout>
  );
};
