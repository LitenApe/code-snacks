import { Frontmatter } from '~/services/cms';
import { Link } from '@remix-run/react';
import { SerializeFrom } from '@remix-run/node';
import { Time } from '../Time';

export function PostPreview(props: {
  post: SerializeFrom<Frontmatter>;
}): JSX.Element {
  const {
    post: {
      id,
      frontmatter: { date, title },
    },
  } = props;

  return (
    <Link to={`/posts/${id}`}>
      <article>
        <header>{title}</header>
        <p>
          published: <Time date={date} />
        </p>
      </article>
    </Link>
  );
}
