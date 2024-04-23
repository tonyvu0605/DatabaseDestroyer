import { lazy } from 'react';
import DefaultLayout from 'layouts/defaultLayout';
import NullUserLayout from 'layouts/nullUserLayout';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';


// ----------------------------------------------------------------------

export const LandingPage = lazy(() => import('pages/landing'));
export const LoginPage = lazy(() => import('pages/login'));
export const RegisterPage = lazy(() => import('pages/register'));
export const PlayerPage = lazy(() => import('pages/player'));
export const TeamPage = lazy(() => import('pages/team'));
export const TopPlayerSalariesPage = lazy(() => import('pages/topPlayerSalaries'));
export const TeamSalariesPage = lazy(() => import('pages/teamSalariesByYear'));
export const AveragePlayerSalariesPage = lazy(() => import('pages/averagePlayerSalaries'));
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
        { path: 'topPlayerSalaries', element: <TopPlayerSalariesPage /> },
        { path: 'averagePlayerSalaries', element: <AveragePlayerSalariesPage /> },
      ],
    },
    {
      element: (
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
      ),
      children: [
        { path: 'team', element: <TeamPage /> },
        { path: 'teamSalaries', element: <TeamSalariesPage /> },
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
