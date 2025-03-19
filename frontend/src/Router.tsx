import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Transactions from "./Pages/Transaction";
import Convert from "./Pages/Convert";
import LoginPage from "./Pages/LoginPage";

const LazyTraineeRoute = lazy(() => import("./Pages/Dashboard"));



const childroutes = [
  {
    index: true,
    element: <Transactions />,
  },
  {
    path: "/convert",
    element: <Convert />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
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
