import { CMS } from '~/services/cms';
import { useLoaderData } from '@remix-run/react';

type Data = Array<any>;

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
      {JSON.stringify(data)}
    </>
  );
}
