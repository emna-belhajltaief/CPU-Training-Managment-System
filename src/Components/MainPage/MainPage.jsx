import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import './MainPage.css';
import NavBar from '../NavBar/NavBar';

// Sample formations data
const trainings = [
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
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const { data: trainings, error } = await supabase
          .from("trainings")
          .select("*");

        if (error) {
          console.log("Error fetching formateurs", error.message);
          return [];
        }
        return trainings;
      } catch (err) {
        console.error('Error fetching data:', err);
        return [{}];
      }
    };
    async function getTrainings() {
      const trainings = await fetchTrainings();
      setTrainings(trainings);
    }

    getTrainings();
  }, []);

  const handleView = (training) => {
    navigate('/Formation', { state: { training } }); // Navigate to the specified path
  };

  const handleCheckIn = (training) => {
    navigate("/CheckIn", { state: { training } }); // Navigate to the check-in path
  };

  return (
    <>
      <NavBar />
      <main className="formation-list">
        {trainings.map((training, index) => (
          <div key={index} className="formation-item">
            <img src={training.logo_url} alt="Formation Logo" className="formation-logo" />
            <div className="formation-details">
              <h3>{training.name}</h3>
              <p>Date: {training.date}</p>
              <p>Location: {training.address}</p>
            </div>
            <div className="edit_button">
              <button
                className="edit-btn"
                onClick={() => handleView(training)}
              >
                View
              </button>
              <button
                className="edit-btn"
                onClick={() => handleCheckIn(training)}
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
