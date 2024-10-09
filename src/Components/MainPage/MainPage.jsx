import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const formations = [
  {
    title: "Formation Dev : introduction HTML, CSS",
    date: "22/10/2024",
    location: "Spring Land",
    logo: "./images/HTMLCSS.png",
  },
  {
    title: "Formation Robotic : introduction stem32",
    date: "29/10/2024",
    location: "ISIMM-C11",
    logo: "./images/stm32.jpg",
  },
  {
    title: "Formation Dev : C++ for beginners",
    date: "9/11/2024",
    location: "Les Jumelles",
    logo: "./images/c++logo.png",
  },
];

const MainPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFormations, setShowFormations] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleShowFormations = () => {
    setShowFormations(true);
  };

  return (
    <>
      <nav className="nav-main">
        <div className="nav-logo">
          <img src="./images/cpuwhite.png" alt="Logo" />
        </div>
        <div className="nav-items">
          <div className="nav-item">
            <Link style={{ color: 'white' }} to="/members">Gestion des membres</Link>
          </div>
          <div className="nav-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <a href="#">Gestion des formations</a>
            {showDropdown && (
              <div className="dropdown">
                <Link to="/FormulaireFormation">Créer Formation</Link>
                <a href="#" onClick={handleShowFormations}>Liste des Formations</a> 
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="formation-list">
        {showFormations && formations.map((formation, index) => (
          <div key={index} className="formation-item">
            <img src={formation.logo} alt="Formation Logo" className="formation-logo" />
            <div className="formation-details">
              <h3>{formation.title}</h3>
              <p>Date: {formation.date}</p>
              <p>Location: {formation.location}</p>
            </div>
            
            <div className="btn">
            <button className="edit-btn">Edit</button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default MainPage;
