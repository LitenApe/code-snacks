import { BadRequest } from './BadRequest';
import { Log } from '~/service/logger';
import { NotFound } from './NotFound';
import { useCatch } from 'remix';

const logger = new Log('CatchBoundary');

export function Multiplexer() {
  const caught = useCatch();

  logger.error(`[status=${caught.status}]`, `[data=${caught.data}]`);

  switch (caught.status) {
    case 404:
      return <NotFound />;
    case 400:
      return <BadRequest />;
    default:
      return <h1>{caught.status}: We can't process your request!</h1>;
  }
}
