import { CMS, Content } from '~/services/cms';

import { DangerousHTML } from '~/components/DangerousHTML';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type Data = Content;

export async function loader({
  params,
}: Parameters<LoaderFunction>[0]): Promise<Data> {
  const postId = params.post_id;

  if (postId === undefined) {
    throw new Response('Bad Request', {
      status: 400,
    });
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
      <h1>{data.frontmatter.title}</h1>
      <p>
        Published:{' '}
        <time dateTime={data.frontmatter.date}>
          {new Date(data.frontmatter.date).toLocaleDateString()}
        </time>
      </p>
      <DangerousHTML content={data.content} />
    </>
  );
}
