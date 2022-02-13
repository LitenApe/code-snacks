export function BadRequest(): JSX.Element {
  return (
    <>
      <h1>Bad Request</h1>
      <p>
        The request has terminated due to invalid information sent with the
        request. The most likely reason is an attempt to access a resource by
        manually modifying the url.
      </p>
      <p>
        Please don't attempt to do any monkey business here, that job is already
        occupied by the the developer of this website.
      </p>
    </>
  );
}
