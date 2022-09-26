import { CMS, Frontmatter } from '~/services/cms';

import { PostPreview } from '~/ui/PostPreview';
import { useLoaderData } from '@remix-run/react';

type Data = Array<Frontmatter>;

export async function loader(): Promise<Data> {
  const posts = await CMS.getPosts();
  return posts;
}

export default function Index(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Archive</h1>
      <ul>
        {data.map((post) => (
          <li key={`/posts/${post.id}`}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
