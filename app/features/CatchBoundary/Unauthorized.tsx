export function Unauthorized(): JSX.Element {
  return (
    <>
      <h1>Unauthorized</h1>
      <p>
        Your request was blocked due to missing or invalid authentication
        credentials.
      </p>
    </>
  );
}
