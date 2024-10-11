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
import Formation from './Components/Formation/Formation.jsx';
import Repatition from './Components/Repartition/Repartition.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckIn from './Components/CheckIn/CheckIn.jsx';
import MainPage from './Components/MainPage/MainPage.jsx';


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
    path: '/show_details', // Render Members
    element: <MemberDetailForm />,
  },
  {
    path: '/Formation', // Render Members
    element: <Formation />,
  },
  
  {
    path: '/Repatition',
    element: <Repatition />, // Fallback for any undefined paths
  },
  {
    path: '/CheckIn',
    element: <CheckIn />, // Fallback for any undefined paths
  },
  {
    path: '/Home',
    element: <MainPage />, // Fallback for any undefined paths
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
