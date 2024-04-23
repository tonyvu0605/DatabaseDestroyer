import { lazy } from 'react';
import DefaultLayout from 'layouts/defaultLayout';
import NullUserLayout from 'layouts/nullUserLayout';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';


// ----------------------------------------------------------------------

export const LandingPage = lazy(() => import('pages/landing'));
export const LoginPage = lazy(() => import('pages/login'));
export const RegisterPage = lazy(() => import('pages/register'));
export const PlayerPage = lazy(() => import('pages/player'));
export const PlayerProfilePage = lazy(() => import('pages/playerProfile'));
export const TeamPage = lazy(() => import('pages/team'));

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
        { path: 'player', element: <PlayerPage /> },
        { path: 'player/:id', element: <PlayerProfilePage /> },
        { path: 'team', element: <TeamPage /> },
      ],
    },
    {
      element: (
        <NullUserLayout>
          <Outlet />
        </NullUserLayout>
      ),
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

}
