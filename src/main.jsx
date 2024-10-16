import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from "@context/authProvider";
import Members from './Components/members/members.jsx';
import HomePage from './Components/HomePage/HomePage.jsx'; // Assuming this is the correct path
import SignUp from './Components/SignUp/SignUp.jsx';
import LogIn from './Components/LogIn/LogIn.jsx';
import FicheMembre from './Components/FicheMembre/FicheMembre.jsx';
import FormulaireFormation from './Components/FormulaireFormation/FormulaireFormation.jsx';
import MemberDetailForm from '@components/members/memberDetailForm.jsx';
import Formation from './Components/Formation/Formation.jsx';
import Repartition from './Components/Repartition/Repartition.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckIn from './Components/CheckIn/CheckIn.jsx';
import MainPage from './Components/MainPage/MainPage.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import ListerFormations from './Components/ListerFormations/ListerFormations.jsx';
import Stats from './Components/Stats/Stats.jsx';
import Registration from './Components/Registration/Registration.jsx';
import RegistrationForm from './Components/Registration/RegistrationForm.jsx';
import ProtectedLayout from './api/protectedLayout.jsx';
import Certifications from './Components/Certifications/Certifications.jsx';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    element: <ProtectedLayout />, // Protect all child routes
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/membreProfile',
        element: <FicheMembre />,
      },
      {
        path: '/members',
        element: <Members />,
      },
      {
        path: '/FormulaireFormation/add',
        element: <FormulaireFormation mode="add" />,
      },
      {
        path: '/FormulaireFormation/edit/:formationId',
        element: <FormulaireFormation mode="edit" />,
      },
      {
        path: '/AddMembre',
        element: <MemberDetailForm />,
      },
      {
        path: '/Formation',
        element: <Formation />,
      },
      {
        path: '/Repartition',
        element: <Repartition />,
      },
      {
        path: '/stats',
        element: <Stats />,
      },
      {
        path: '/SendCertifications',
        element: <Certifications />,
      },
      {
        path: '/CheckIn',
        element: <CheckIn />,
      },
      
      {
        path: '/Registration/:formationId',
        element: <Registration />,
      },
      {
        path: '/RegistrationForm/:formationId',
        element: <RegistrationForm />,
      },
      {
        path: '/Home',
        element: <MainPage />,
      },
      {
        path: '/Lister_Formations',
        element: <ListerFormations />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
