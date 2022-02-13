export function NotFound(): JSX.Element {
  return (
    <>
      <h1>Resource Not Found</h1>
      <p>
        The resource you are attempting to access is unavailable. It is either
        missing or you might not have necessary privileges to view the requested
        information.
      </p>
      <p>
        If you should have access, but still can't access it, then please
        confirm that it exist. First by visiting the content management system,
        afterward, check that your desired route is configured in the code
        itself.
      </p>
    </>
  );
}
