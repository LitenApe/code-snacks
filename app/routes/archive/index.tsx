import { useLoaderData } from "@remix-run/react";
import { ArticleOverview } from '~/features/ArticleOverview';
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
      <ArticleOverview posts={data} />
    </>
  );
}
