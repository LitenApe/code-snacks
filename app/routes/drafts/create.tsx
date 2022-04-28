import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { CMS } from '~/service/cms';
import { Routes } from '~/lib/routes';
import { isDefined } from '~/lib/isDefined';

interface ErrorResponse {
  title?: string;
  content?: string;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ErrorResponse | ReturnType<typeof redirect>> => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }

  const payload = await request.formData();
  const title = payload.get('title');
  const content = payload.get('content');
  const published = payload.get('published');

  if (!isDefined(title) || !isDefined(content)) {
    const errors: ErrorResponse = {};

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
    const res = await cms.createPost({
      title: title as string,
      content: content as string,
      publishedAt: isDefined(published) ? new Date().toISOString() : null,
    });

    return redirect(
      `${isDefined(published) ? Routes.ARCHIVE : Routes.DRAFTS}/${res.id}`,
    );
  } catch {
    return {};
  }
};

export default function Create(): JSX.Element {
  return (
    <>
      <h1>Create new post</h1>
      <Form method="post">
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" required />
        </label>

        <label htmlFor="content">
          content
          <textarea id="content" name="content" required />
        </label>

        <label htmlFor="published">
          <input type="checkbox" id="published" name="published" />
          published
        </label>
        <button type="submit">Save</button>
      </Form>
    </>
  );
}
