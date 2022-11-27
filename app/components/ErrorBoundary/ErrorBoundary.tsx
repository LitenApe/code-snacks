import { InternalServerError } from './InternalServerError';
import { getLogger } from '~/services/logger';

const logger = getLogger('ErrorBoundary');

export function ErrorBoundary(props: { error: Error }): JSX.Element {
  const { error } = props;
  const { message, stack } = error;
  logger.error(`[message=${message}]`, `[stack=${stack}]`);
  return <InternalServerError />;
}
