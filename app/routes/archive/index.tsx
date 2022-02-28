import { Link, useLoaderData } from 'remix';
import { DangerousHTML } from '~/components/DangerousHTML';
import { Routes } from '~/lib/routes';
import { CMS } from '~/service/cms';
import { PostDTO } from '~/service/cms/domain';

type Data = Array<PostDTO>;

export async function loader(): Promise<Data> {
  const cms = new CMS();
  const posts = await cms.getPosts();
  return posts;
}

export default function Archive(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Archive</h1>
      <ul>
        {data.map((post: PostDTO) => (
          <li key={`post-${post.id}`}>
            <article>
              <header>
                <h2>
                  <Link to={`${Routes.ARCHIVE}/${post.id}`}>{post.title}</Link>
                </h2>
                <p>
                  <time dateTime={`${post.publishedAt}`}>
                    {post.publishedAt}
                  </time>
                </p>
              </header>
              <DangerousHTML content={post.content} />
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
