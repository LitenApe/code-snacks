export function Time(props: { date: string }): JSX.Element {
  const { date } = props;

  const locale = new Date(date).toLocaleDateString();
  return <time dateTime={date}>{locale}</time>;
}
