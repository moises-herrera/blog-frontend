import { Suspense, lazy } from "react";
import { AuthLoading } from "src/auth/components";

export function LazyLoadRoute(componentPath: string) {
  const LazyElement = lazy(() => import(componentPath));

  return (
    <Suspense fallback={<AuthLoading />}>
      <LazyElement />
    </Suspense>
  );
}
