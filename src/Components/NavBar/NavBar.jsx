import { Link, useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import "./NavBar.css"
function NavBar(){
  const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const gotomain =()=>{
      navigate("/Home")
    }
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    


    return(<>      
    <nav className="nav-main">
        <div onClick={gotomain}  className="nav-logo">
          <img  src="./images/cpuwhite.png" className="point" alt="Logo" />
        </div>
        <div className="nav-items">
          <div className="nav-item">
            <Link style={{ color: 'white' }} to="/members">Gestion des membres</Link>
          </div>
          <div className="nav-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <a href="#">Gestion des formations</a>
            {showDropdown && (
              <div className="dropdown">
                <Link to="/FormulaireFormation/add">Créer Formation</Link>
                <Link to="/Lister_Formations" >Liste des Formations</Link> 
              </div>
            )}
          </div>
        </div>
      </nav></>)
}

export default NavBar