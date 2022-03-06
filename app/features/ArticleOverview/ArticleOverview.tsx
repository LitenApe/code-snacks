import { ArticleCard } from './ArticleCard';
import { PostDTO } from '~/service/cms/domain';

interface Props {
  readonly level?: 2 | 3 | 4 | 5 | 6;
  readonly posts: Array<PostDTO>;
}

export function ArticleOverview(props: Props): JSX.Element {
  const { posts, level = 2 } = props;

  return (
    <ul>
      {posts.map(
        (post): JSX.Element => (
          <li key={`article-overview-${post.id}`}>
            <ArticleCard post={post} level={level} />
          </li>
        )
      )}
    </ul>
  );
}
