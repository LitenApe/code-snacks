import { Link } from 'remix';
import type { PostDTO } from '~/service/cms/domain';
import { Routes } from '~/lib/routes';
import { useRootData } from '../RootDataContext';

interface Props {
  readonly post: PostDTO;
}

export function ArticleAction(props: Props): JSX.Element | null {
  const { post } = props;
  const { isAuthenticated } = useRootData();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Link to={`${Routes.DRAFTS}/${post.id}`}>Edit</Link>
      <button type="button">Toggle</button>
    </>
  );
}
