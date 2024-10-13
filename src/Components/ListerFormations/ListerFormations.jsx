import React from 'react'
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
const ListerFormations = () => {
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
            <Link to="/FormulaireFormation"><button className="edit-btn">Edit</button></Link>
            <Link to="/Repatition"> <button className="edit-btn">Répartir</button></Link>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export default ListerFormations
