import { CatchBoundary as KnownExceptionBoundary } from '~/ui/CatchBoundary';
import { Outlet } from '@remix-run/react';
import { ErrorBoundary as UnknownExceptionBoundary } from '~/ui/ErrorBoundary';

export default function Root() {
  return <Outlet />;
}

export function CatchBoundary() {
  return <KnownExceptionBoundary />;
}

export function ErrorBoundary(props: { error: Error }) {
  const { error } = props;
  return <UnknownExceptionBoundary error={error} />;
}
