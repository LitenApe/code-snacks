import { LoaderFunction, useLoaderData } from 'remix';

import { Log } from '~/service/logger';

interface Data {
  id: number;
}

export const loader: LoaderFunction = (args): Data => {
  const logger = new Log('Archive Post');
  const { params } = args;

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

export default function Post() {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Post</h1>
      <p>id: {data.id}</p>
    </>
  );
}
