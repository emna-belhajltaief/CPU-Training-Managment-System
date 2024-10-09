import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Members from './Components/members/members.jsx';
import HomePage from './Components/HomePage/HomePage.jsx'; // Assuming this is the correct path
import SignUp from './Components/SignUp/SignUp.jsx';
import LogIn from './Components/LogIn/LogIn.jsx';
import FicheMembre from './Components/FicheMembre/FicheMembre.jsx';
import FormulaireFormation from './Components/FormulaireFormation/FormulaireFormation.jsx';
import MemberDetailForm from '@components/members/memberDetailForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './Components/MainPage/MainPage.jsx';
import CheckIn from './Components/CheckIn/CheckIn.jsx';

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
    path: 'FormulaireFormation', // Render Members
    element: <FormulaireFormation />,
  },
  {
    path: '/members/show_details', // Render Members
    element: <MemberDetailForm />,
  },
  {
    path:'main' ,
    element: <MainPage />,

  },
  {
    path: 'checkin',
    element: <CheckIn />,
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
