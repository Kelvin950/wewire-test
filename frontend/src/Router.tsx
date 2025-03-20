import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import TransactionPage from "./Pages/TransactionPage";
import Convert from "./Pages/Convert";
import LoginPage from "./Pages/LoginPage";

const LazyTraineeRoute = lazy(() => import("./Pages/Dashboard"));



const childroutes = [
  {
    index: true,
    element: <TransactionPage />,
  },
  {
    path: "/convert",
    element: <Convert />,
  },
  {
    path: "/transactions",
    element: <TransactionPage />,
  },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<>Loading...</>}>
        <LazyTraineeRoute />
      </Suspense>
    ),
    children: [...childroutes],
    errorElement: <>Error</>,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
