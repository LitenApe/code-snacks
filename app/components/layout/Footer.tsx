import { Landmarks } from '~/lib/landmarks';
import { Footer } from '~/service/cms/domain';
import { DangerousHTML } from '../DangerousHTML';

interface Props {
  readonly texts: Footer['footer']['data']['attributes'];
}

export function Footer(props: Props): JSX.Element {
  const { texts } = props;

  return (
    <footer id={Landmarks.FOOTER} tabIndex={-1}>
      <DangerousHTML content={texts.credits} />
    </footer>
  );
}
