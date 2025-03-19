import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const LazyTraineeRoute = lazy(() => import("./trainees/TraineeDashboard"));

const router = createBrowserRouter([
  // Joshua's Trainee Lazy route

  {
    path: "/",
    element: (
      <Suspense fallback={<>Loading...</>}>
        <LazyTraineeRoute />
      </Suspense>
    ),
    children: [...traineeRoutes],
    errorElement: <>Error</>,
  },
]);

export default router;
