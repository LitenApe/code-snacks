import { BadRequest } from './BadRequest';
import { NotFound } from './NotFound';
import { Unauthorized } from './Unauthorized';
import { getLogger } from '~/services/logger';
import { useCatch } from '@remix-run/react';

function getExceptionMessage(status: number): JSX.Element {
  switch (status) {
    case 400:
      return <BadRequest />;
    case 401:
      return <Unauthorized />;
    case 404:
      return <NotFound />;
    default:
      return <h1>{status}: We can&apos;t process your request!</h1>;
  }
}

const logger = getLogger('CatchBoundary');

export function CatchBoundary(): JSX.Element {
  const caught = useCatch();
  const children = getExceptionMessage(caught.status);
  logger.error(`[status=${caught.status}]`, `[data=${caught.data}]`);
  return children;
}
