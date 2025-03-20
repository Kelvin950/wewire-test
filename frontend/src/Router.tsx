import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import TransactionPage from "./Pages/TransactionPage";
import Convert from "./Pages/Convert";
import LoginPage from "./Pages/LoginPage";
import ExchangeRates from "./Pages/Rates";
import ProtectedRoute from "./components/ProtectedRoute";

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
  {
    path: "/rates",
    element: <ExchangeRates />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<>Loading...</>}>
          <LazyTraineeRoute />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [...childroutes],
    errorElement: <>Error</>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {path:"*", element:<h1>404</h1>}
]);

export default router;
