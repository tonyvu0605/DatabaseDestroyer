import { lazy } from 'react';
import DefaultLayout from 'layouts/defaultLayout';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';


// ----------------------------------------------------------------------

export const LandingPage = lazy(() => import('pages/landing'));
export const LoginPage = lazy(() => import('pages/login'));
export const RegisterPage = lazy(() => import('pages/register'));
export const PlayerPage = lazy(() => import('pages/player'));
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: (
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      ),
      children: [
        { element: <LandingPage />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'player', element: <PlayerPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

}
