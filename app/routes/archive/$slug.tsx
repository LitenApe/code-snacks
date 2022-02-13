import { LoaderFunction, useLoaderData } from 'remix';

interface Data {
  id: number;
}

export const loader: LoaderFunction = (args): Data => {
  const { params } = args;

  const postId =
    typeof params.slug !== 'undefined'
      ? Number.parseInt(params.slug)
      : Number.NaN;

  if (Number.isNaN(postId)) {
    throw new Response('Invalid request', { status: 400 });
  }

  return {
    id: postId,
  };
};

export default function Post() {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Post</h1>
      <p>id: {data.id}</p>
    </>
  );
}
