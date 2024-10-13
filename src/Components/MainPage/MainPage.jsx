import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import NavBar from '../NavBar/NavBar';

// Sample formations data
const formations = [
  {
    title: "Formation Dev : introduction HTML, CSS",
    date: "22/10/2024",
    location: "Spring Land",
    logo: "./images/HTML&CSS.png",
    viewPath: "/formation/html-css", // Path for viewing details
    checkInPath: "/check-in/html-css", // Path for check-in
  },
  {
    title: "Formation Robotic : introduction stem32",
    date: "29/10/2024",
    location: "ISIMM-C11",
    logo: "./images/STM32.png",
    viewPath: "/formation/stem32", // Path for viewing details
    checkInPath: "/check-in/stem32", // Path for check-in
  },
  {
    title: "Formation Dev : C++ for beginners",
    date: "9/11/2024",
    location: "Les Jumelles",
    logo: "./images/C++_logo.png",
    viewPath: "/formation/cpp", // Path for viewing details
    checkInPath: "/check-in/cpp", // Path for check-in
  },
];

const MainPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleView = () => {
    navigate('/FormulaireFormation'); // Navigate to the specified path
  };

  const handleCheckIn = () => {
    navigate("/CheckIn"); // Navigate to the check-in path
  };

  return (
    <>
      <NavBar />
      <main className="formation-list">
        {formations.map((formation, index) => (
          <div key={index} className="formation-item">
            <img src={formation.logo} alt="Formation Logo" className="formation-logo" />
            <div className="formation-details">
              <h3>{formation.title}</h3>
              <p>Date: {formation.date}</p>
              <p>Location: {formation.location}</p>
            </div>
            <div className="edit_button">
              <button 
                className="edit-btn" 
                onClick={() => handleView()}
              >
                View
              </button>
              <button 
                className="edit-btn" 
                onClick={() => handleCheckIn()}
              >
                Open for check-in
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default MainPage;
