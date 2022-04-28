import { useLoaderData } from "@remix-run/react";
import { ArticleOverview } from '~/features/ArticleOverview';
import { CMS } from '~/service/cms';
import { PostDTO } from '~/service/cms/domain';

type Data = Array<PostDTO>;

export async function loader(): Promise<Data> {
  const cms = new CMS();
  const posts = await cms.getPosts();
  return posts.slice(0, 10);
}

export default function Index(): JSX.Element {
  const data = useLoaderData<Data>();

  return (
    <>
      <h1>Tech Snacks</h1>
      <h2>Recent posts</h2>
      <ArticleOverview posts={data} />
    </>
  );
}
