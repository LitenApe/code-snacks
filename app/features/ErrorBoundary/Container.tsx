/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import type { ErrorBoundaryComponent } from 'remix';
import { InternalServerError } from './InternalServerError';
import { Layout } from '../Layout';
import { Log } from '~/service/logger';

export const Container: ErrorBoundaryComponent = (props): JSX.Element => {
  const { error } = props;
  const { message, stack } = error;
  const logger = new Log('ErrorBoundary');
  logger.error(`[message=${message}]`, `[stack=${stack}]`);
  return (
    <Layout>
      <InternalServerError />
    </Layout>
  );
};
