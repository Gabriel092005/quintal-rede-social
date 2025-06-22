
import { createBrowserRouter } from 'react-router-dom';
import { AuthLayoutPacient } from './pages/_layouts/auth-pacient';
import { SignIn } from './pages/auth/Sign-in';
import { AppLayoutAdmin } from './pages/_layouts/app-admin';
import { DashBoardAdmin } from './pages/app/dashboard-admin/dashboard-admin';
import { Community } from './pages/app/dashboard-admin/comunity';
import { Dash } from './pages/app/dashboard-admin/dash';
import { SignUp } from './pages/auth/sign-up';
import { Configurations } from './pages/app/dashboard-admin/config';

export const router = createBrowserRouter([

  {
    path: '/',
    element: <AuthLayoutPacient />,
    children: [
      { index: true, element: <SignIn /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp/> },
    ],
  },
  {
    path: '/',
    element: <AppLayoutAdmin />,
    children: [
      { path: '/home/:id', element: <DashBoardAdmin /> },
      { path: '/home', element: <DashBoardAdmin /> },
      { path: '/dash', element: <Dash/> },
      { path: '/config', element: <Configurations/> },
      { path: '/messages', element: <Community/> },
    ],
  },

]);
