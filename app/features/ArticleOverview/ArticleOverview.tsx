import { Heading } from '~/components/layout/Heading';
import { Link } from 'remix';
import { PostDTO } from '~/service/cms/domain';
import { Routes } from '~/lib/routes';
import { isDefined } from '~/lib/isDefined';

interface Props {
  readonly level?: 2 | 3 | 4 | 5 | 6;
  readonly posts: Array<PostDTO>;
}

export function ArticleOverview(props: Props): JSX.Element {
  const { posts, level = 2 } = props;

  return (
    <ul>
      {posts.map((post): JSX.Element => {
        const { id, title, publishedAt, createdAt } = post;
        const isDraft = !isDefined(publishedAt);
        const timestamp = isDraft ? createdAt : publishedAt;
        const uri = isDraft ? Routes.DRAFTS : Routes.ARCHIVE;

        return (
          <li key={`article-overview-${isDraft}-${id}`}>
            <Link to={`${uri}/${id}`}>
              <article>
                <Heading level={level}>{title}</Heading>
                <p>
                  <time dateTime={timestamp}>{timestamp}</time>
                </p>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
