import type { ErrorBoundaryComponent } from 'remix';
import { InternalServerError } from './InternalServerError';
import { Log } from '~/service/logger';

const logger = new Log('ErrorBoundary');

export const Container: ErrorBoundaryComponent = ({ error }) => {
  logger.error(`[message=${error.message}]`, `[stack=${error.stack}]`);
  return <InternalServerError />;
};
