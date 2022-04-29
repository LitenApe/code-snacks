import { InternalServerError } from './InternalServerError';
import { Layout } from '../Layout';
import { Logger } from '~/services/logger';

export function ErrorBoundary(props: { error: Error }): JSX.Element {
  const { error } = props;
  const { message, stack } = error;
  const logger = new Logger('ErrorBoundary');
  logger.error(`[message=${message}]`, `[stack=${stack}]`);
  return (
    <Layout>
      <InternalServerError />
    </Layout>
  );
}
