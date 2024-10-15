import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import './MainPage.css';
import NavBar from '../NavBar/NavBar';


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
  const handleStatics = () => {
    navigate("/stats"); // Navigate to the statics path
  };
  const handleRegistration = (training) => {
    navigate(`/Registration/${training.id}` );
  }

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
                onClick={() => handleRegistration(training)}
              >
                Open for Registration
              </button>


              <button
                className="edit-btn"
                onClick={() => handleCheckIn(training)}
              >
                Open for check-in
              </button>
              <button
              className="edit-btn"
              onClick={()=> handleStatics()}
              >
                Statics
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default MainPage;
