import { InternalServerError } from './InternalServerError';
import { Logger } from '~/services/logger';

export function ErrorBoundary(props: { error: Error }): JSX.Element {
  const { error } = props;
  const { message, stack } = error;
  const logger = new Logger('ErrorBoundary');
  logger.error(`[message=${message}]`, `[stack=${stack}]`);
  return <InternalServerError />;
}
