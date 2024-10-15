import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App.jsx';
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

const router = createBrowserRouter([
  {
    path: '/',            //initial page
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
    path: '/FormulaireFormation', // Render Members

    element: <FormulaireFormation />,
  },
  {
    path: '/AddMembre', // Formulaire d'ajout d'un membre (admin privilage)
    element: <MemberDetailForm />,
  },
  {
    path: '/Formation', // View formation details
    element: <Formation />,
  },
  
  {
    path: '/Repartition',
    element: <Repartition />, // show repartitin page (admin privilage)
  },
  {
    path: '/stats',
    element:<Stats />, // show statics page (admin privilage)
  },
  {
    path: '/CheckIn',
    element: <CheckIn />, // page checkin (admin privilage)
  },
  {
    path: '/Home',
    element: <MainPage />, // homepage
  },
  {
    path: '/Lister_Formations',
    element: <ListerFormations/>, // formation liste 
  },
  {
    path: '/*',
    element: <NotFound/>, // not found page
  },



  
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
