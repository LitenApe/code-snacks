import { Form, useLoaderData } from 'remix';

import { CMS } from '~/service/cms';
import type { LoaderFunction } from 'remix';
import { Log } from '~/service/logger';
import type { PostDTO } from '~/service/cms/domain';
import { isDefined } from '~/lib/isDefined';

interface Data {
  post: PostDTO;
  id: number;
}

export const loader: LoaderFunction = async ({ params }): Promise<Data> => {
  const logger = new Log('Edit Post');
  const cms = new CMS({
    isAuthenticated: true,
  });

  // eslint-disable-next-line operator-linebreak
  const postId =
    typeof params.slug !== 'undefined'
      ? Number.parseInt(params.slug, 10)
      : Number.NaN;

  if (Number.isNaN(postId)) {
    logger.error(`Request of resource with malformed [uri=${params.slug}]`);
    throw new Response('Invalid request', { status: 400 });
  }

  const post = await cms.getPost(postId, true, true);

  if (typeof post === 'undefined') {
    logger.error(`Unable to find post with [id=${postId}]`);
    throw new Response('Invalid request', { status: 404 });
  }

  return {
    post,
    id: postId,
  };
};

export default function Draft(): JSX.Element {
  const { id, post } = useLoaderData<Data>();

  return (
    <>
      <h1>Edit post: {id}</h1>
      <Form method="post">
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            required
          />
        </label>

        <label htmlFor="content">
          Content
          <textarea
            id="content"
            name="content"
            defaultValue={post.content}
            required
          />
        </label>
        <label htmlFor="published">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={isDefined(post.publishedAt)}
          />
          Published
        </label>
        <button type="submit">Save</button>
      </Form>
    </>
  );
}
