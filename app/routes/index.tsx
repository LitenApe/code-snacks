import { CMS, Frontmatter } from '~/services/cms';
import { Link, useLoaderData } from '@remix-run/react';

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
      <h2>Recent posts</h2>
      <ol>
        {data.map((post) => (
          <li key={`/posts/${post.id}`}>
            <Link to={`/posts/${post.id}`}>
              <article>
                <header>{post.frontmatter.title}</header>
                <p>
                  published:{' '}
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString()}
                  </time>
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
