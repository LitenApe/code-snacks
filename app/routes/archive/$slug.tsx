import type { LoaderFunction } from 'remix';
import { Log } from '~/service/logger';
import { useLoaderData } from 'remix';

interface Data {
  id: number;
}

export const loader: LoaderFunction = ({ params }): Data => {
  const logger = new Log('Archive Post');

  const postId =
    typeof params.slug !== 'undefined'
      ? Number.parseInt(params.slug)
      : Number.NaN;

  if (Number.isNaN(postId)) {
    logger.error(`Request of resource with malformed [uri=${params.slug}]`);
    throw new Response('Invalid request', { status: 400 });
  }

  return {
    id: postId,
  };
};

export default function Post(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Post</h1>
      <p>id: {data.id}</p>
    </>
  );
}
