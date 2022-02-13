import type { ErrorBoundaryComponent } from 'remix';
import { InternalServerError } from './InternalServerError';
import { LayoutWrapper } from '../LayoutWrapper';
import { Log } from '~/service/logger';

export const Container: ErrorBoundaryComponent = ({ error }) => {
  const logger = new Log('ErrorBoundary');
  logger.error(`[message=${error.message}]`, `[stack=${error.stack}]`);
  return (
    <LayoutWrapper>
      <InternalServerError />
    </LayoutWrapper>
  );
};
