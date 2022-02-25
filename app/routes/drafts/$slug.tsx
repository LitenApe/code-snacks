import type { LoaderFunction } from 'remix';
import { Log } from '~/service/logger';
import { useLoaderData } from 'remix';
import { CMS } from '~/service/cms';
import { Post } from '~/service/cms/domain';
import { DangerousHTML } from '~/components/DangerousHTML';

interface Data {
  post: Post['posts']['data'][number];
  id: number;
}

export const loader: LoaderFunction = async ({ params }): Promise<Data> => {
  const logger = new Log('Draft Post');
  const cms = new CMS();

  const postId =
    typeof params.slug !== 'undefined'
      ? Number.parseInt(params.slug)
      : Number.NaN;

  if (Number.isNaN(postId)) {
    logger.error(`Request of resource with malformed [uri=${params.slug}]`);
    throw new Response('Invalid request', { status: 400 });
  }

  const post = await cms.getPost(postId, true);

  if (typeof post === 'undefined') {
    logger.error(`Unable to find post with [id=${postId}]`);
    throw new Response('Invalid request', { status: 404 });
  }

  return {
    post,
    id: postId,
  };
};

export default function Post(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>{data.post.attributes.title}</h1>
      <DangerousHTML content={data.post.attributes.content} />
    </>
  );
}
