import { ComponentType, Suspense, lazy } from "react";
import { AuthLoading } from "src/auth/components";

export function LazyLoadRoute(
  factory: () => Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ComponentType<any>;
  }>
) {
  const LazyElement = lazy(factory);

  return (
    <Suspense fallback={<AuthLoading />}>
      <LazyElement />
    </Suspense>
  );
}
