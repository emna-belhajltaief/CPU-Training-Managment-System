import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import NavBar from '../NavBar/NavBar';
import './ListerFormations.css';  // Assuming you have a CSS file for styling

const ListerFormations = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const { data: formations, error } = await supabase
          .from("trainings")   // Adjust the table name if needed
          .select("*");

        if (error) {
          console.log("Error fetching formations", error.message);
        } else {
          setFormations(formations);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchFormations();
  }, []);

  return (
    <>
      <NavBar />
      <main className="formation-list">
        {formations.map((formation, index) => (
          <div key={index} className="formation-item">
            <img src={formation.logo_url} alt="Formation Logo" className="formation-logo" />
            <div className="formation-details">
              <h3>{formation.name}</h3>
              <p>Date: {formation.date}</p>
              <p>Location: {formation.address}</p>
            </div>
            <div className="edit_button">
              <Link to="/FormulaireFormation">
                <button className="edit-btn">Edit</button>
              </Link>
              <Link to="/Repartition">
                <button className="edit-btn">Répartir</button>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default ListerFormations;
