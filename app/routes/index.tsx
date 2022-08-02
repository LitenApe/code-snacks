import { CMS, Content } from '~/services/cms';
import { Link, useLoaderData } from '@remix-run/react';

type Data = Array<Content>;

export async function loader(): Promise<Data> {
  const posts = await CMS.getPosts();
  const postsWithContent = await Promise.all(
    posts.slice(0, 3).map(({ id }) => CMS.getPost(id)),
  );
  return postsWithContent;
}

export default function Index(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Tech Snacks</h1>
      <h2>Recent posts</h2>
      <ul>
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
      </ul>
    </>
  );
}
