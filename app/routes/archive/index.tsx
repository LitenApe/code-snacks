import { Link, useLoaderData } from 'remix';
import { DangerousHTML } from '~/components/DangerousHTML';
import { Routes } from '~/lib/routes';
import { CMS } from '~/service/cms';
import { Posts } from '~/service/cms/domain';

type Data = Array<Posts['posts']['data'][number]>;

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
        {data.map((post) => (
          <li key={`post-${post.id}`}>
            <article>
              <header>
                <h2>
                  <Link to={`${Routes.ARCHIVE}/${post.id}`}>
                    {post.attributes.title}
                  </Link>
                </h2>
                <time dateTime={post.attributes.publishedAt}>
                  {post.attributes.publishedAt}
                </time>
              </header>
              <DangerousHTML content={post.attributes.content} />
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
