import { CMS, Frontmatter } from '~/services/cms';

import { PostPreview } from '~/components/PostPreview';
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
      <h1>Tech Snacks</h1>
      <p>
        Hi, I&apos;m LitenApe, also known as Son. I&apos;m a full time
        developer, or more specifically, a frontend developer. I love to create
        things for the web and have built up a repertoar of opinions on how
        things should be made, just like any other developer. Which is why this
        site was made in the first place. This is a place created to share my
        opinions on everything related to development. The posts you will find
        here are heavily weighted towards web development, as that is where I
        spend most of my time.
      </p>
      <h2>Recent posts</h2>
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
