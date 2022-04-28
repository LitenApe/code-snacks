import { Heading } from '~/components/layout/Heading';
import { Link } from "@remix-run/react";
import { PostDTO } from '~/service/cms/domain';
import { Routes } from '~/lib/routes';
import { isDefined } from '~/lib/isDefined';
import { useRootData } from '../RootDataContext';

interface Props {
  readonly post: PostDTO;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ArticleCard(props: Props): JSX.Element {
  const { post, level = 2 } = props;
  const {
    id, title, publishedAt, createdAt,
  } = post;
  const { isAuthenticated } = useRootData();

  const isDraft = !isDefined(publishedAt);
  const timestamp = isDraft ? createdAt : publishedAt;
  const uri = isDraft ? Routes.DRAFTS : Routes.ARCHIVE;

  return (
    <article>
      <Link to={`${uri}/${id}`}>
        <Heading level={level}>{title}</Heading>
      </Link>
      <p>
        <time dateTime={timestamp}>{timestamp}</time>
      </p>
      {isAuthenticated && <Link to={`${Routes.DRAFTS}/${id}/edit`}>Edit</Link>}
    </article>
  );
}
