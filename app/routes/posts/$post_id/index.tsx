import { CMS, Content } from '~/services/cms';
import { LoaderFunction, MetaFunction } from '@remix-run/node';

import { DangerousHTML } from '~/components/DangerousHTML';
import codeHighlightingStylesheet from 'highlight.js/styles/github-dark.css';
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

  try {
    const post = await CMS.getPost(postId);
    return post;
  } catch (ignored) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
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

export const meta: MetaFunction = (args) => {
  const data = args.data as Data;

  return {
    title: `${data.frontmatter.title} | Tech Snacks`,
  };
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: codeHighlightingStylesheet,
    },
  ];
}
