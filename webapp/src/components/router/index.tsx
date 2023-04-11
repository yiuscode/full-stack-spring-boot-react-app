import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Login } from '../login';
import { TodoApp } from '../todo';
import Error from '../error';
import Home from '../home';
import { Navbar } from '../navbar';
import { RequireAuth } from '../../context/security';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/app',
        element: (
          <RequireAuth>
            <TodoApp />
          </RequireAuth>
        ),
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
