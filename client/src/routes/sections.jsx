import { lazy } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// ----------------------------------------------------------------------

export const LandingPage = lazy(() => import('pages/landing'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <>
          {' '}
          {/* LayoutWrapper would go here */}
          <Outlet />
        </>
      ),
      children: [{ element: <LandingPage />, index: true }],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
}
