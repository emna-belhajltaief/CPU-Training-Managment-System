import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Members from '@components/members/members.jsx';
import MemberDetailForm from '@components/members/memberDetailForm.jsx';
import HomePage from '@components/HomePage/HomePage.jsx'; // Assuming this is the correct path
import SignUp from '@components/SignUp/SignUp.jsx';
import LogIn from '@components/LogIn/LogIn.jsx';
import FicheMembre from '@components/FicheMembre/FicheMembre.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/', // This will render HomePage for the root
    element: <HomePage />,
  },
  {
    path: '/signup', // Render SignUp
    element: <SignUp />,
  },
  {
    path: '/login', // Render LogIn
    element: <LogIn />,
  },
  {
    path: '/membreProfile', // Render FicheMembre
    element: <FicheMembre />,
  },
  {
    path: '/members', // Render Members
    element: <Members />,
  },
  {
    path: '/members/show_details', // Render Members
    element: <MemberDetailForm />,
  },
  {
    path: '/*',
    element: <Navigate to="/" />, // Fallback for any undefined paths
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
