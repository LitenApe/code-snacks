import {
  ActionFunction, Form, redirect, useLoaderData,
} from 'remix';

import { CMS } from '~/service/cms';
import type { LoaderFunction } from 'remix';
import { Log } from '~/service/logger';
import type { PostDTO } from '~/service/cms/domain';
import { Routes } from '~/lib/routes';
import { isDefined } from '~/lib/isDefined';

interface Data {
  post: PostDTO;
  id: number;
}

interface ErrorResponse {
  id?: string;
  title?: string;
  content?: string;
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

export const action: ActionFunction = async ({
  request,
}): Promise<ErrorResponse | ReturnType<typeof redirect>> => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }

  const payload = await request.formData();
  const id = payload.get('id');
  const title = payload.get('title');
  const content = payload.get('content');
  const publishedAt = payload.get('publishedAt');

  if (!isDefined(title) || !isDefined(content) || !isDefined(id)) {
    const errors: ErrorResponse = {};

    if (!isDefined(id)) {
      errors.id = 'id is required';
    }

    if (!isDefined(title)) {
      errors.title = 'title is required';
    }

    if (!isDefined(content)) {
      errors.content = 'content is required';
    }

    return errors;
  }

  const cms = new CMS({ isAuthenticated: true });

  try {
    const res = await cms.updatePost({
      id: id as string,
      title: title as string,
      content: content as string,
      publishedAt: isDefined(publishedAt) ? new Date().toISOString() : null,
    });

    return redirect(
      `${isDefined(publishedAt) ? Routes.ARCHIVE : Routes.DRAFTS}/${res.id}`,
    );
  } catch {
    return {};
  }
};

export default function Draft(): JSX.Element {
  const { id, post } = useLoaderData<Data>();

  return (
    <>
      <h1>Edit post: {id}</h1>
      <Form method="post">
        <input type="hidden" name="id" defaultValue={id} />

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
            id="publishedAt"
            name="publishedAt"
            defaultChecked={isDefined(post.publishedAt)}
          />
          Published
        </label>
        <button type="submit">Save</button>
      </Form>
    </>
  );
}
