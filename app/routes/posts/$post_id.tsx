import { CMS } from '~/services/cms';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type Data = any;

export async function loader({
  params,
}: Parameters<LoaderFunction>[0]): Promise<Data> {
  const postId = params.post_id;

  if (postId === undefined) {
    return null;
  }

  const post = await CMS.getPost(postId);

  if (post === undefined) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return post;
}

export default function Post(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Post</h1>
      {JSON.stringify(data)}
    </>
  );
}
