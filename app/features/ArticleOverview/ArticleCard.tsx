import { Link } from 'remix';
import { Heading } from '~/components/layout/Heading';
import { PostDTO } from '~/service/cms/domain';
import { Routes } from '~/lib/routes';
import { isDefined } from '~/lib/isDefined';

interface Props {
  readonly post: PostDTO;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ArticleCard(props: Props): JSX.Element {
  const { post, level = 2 } = props;
  const {
    id, title, publishedAt, createdAt,
  } = post;
  const isDraft = !isDefined(publishedAt);
  const timestamp = isDraft ? createdAt : publishedAt;
  const uri = isDraft ? Routes.DRAFTS : Routes.ARCHIVE;

  return (
    <Link to={`${uri}/${id}`}>
      <article>
        <Heading level={level}>{title}</Heading>
        <p>
          <time dateTime={timestamp}>{timestamp}</time>
        </p>
      </article>
    </Link>
  );
}
