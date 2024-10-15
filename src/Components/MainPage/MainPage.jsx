import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import { CircleLoader } from 'react-spinners';


const MainPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [trainings, setTrainings] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const { data: trainings, error } = await supabase
          .from("trainings")
          .select("*");

        if (error || trainings.length === 0) {
          console.error("Error fetching formateurs", error?.message);
          setPermissionDenied(true);
          return [];
        }
        else {
          console.error(error)
          console.log("Trainings fetched successfully");
        }
        return trainings;
      } catch (err) {
        console.error('Error fetching data:', err);
        return [];
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
        {!permissionDenied ? trainings.map((training, index) => (
          <>
            <CircleLoader
              color="#fff"
              loading={training.length === 0}
              size={250}
              speedMultiplier={3}
            />
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
          </>
        )) : <h1>Permission Denied</h1>}
      </main>
    </>
  );
};

export default MainPage;
