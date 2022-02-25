import type { ErrorBoundaryComponent } from 'remix';
import { InternalServerError } from './InternalServerError';
import { Layout } from '../Layout';
import { Log } from '~/service/logger';

export const Container: ErrorBoundaryComponent = ({ error }): JSX.Element => {
  const logger = new Log('ErrorBoundary');
  logger.error(`[message=${error.message}]`, `[stack=${error.stack}]`);
  return (
    <Layout>
      <InternalServerError />
    </Layout>
  );
};
