import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import { useState } from 'react';
import "./NavBar.css"

function NavBar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const gotomain = () => {
    navigate("/Home")
  }
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignout = () => {
    const signOutUser = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error.message);
      } else {
        sessionStorage.removeItem('supabaseSession');
        console.log('User signed out successfully');
        navigate("/login")
      }
    };
    signOutUser();
  }

  return (<>
    <nav className="nav-main">
      <div onClick={gotomain} className="nav-logo">
        <img src="/images/cpuwhite.png" className="point" alt="Logo" />
      </div>
      <div className="nav-items">
        <div className="nav-item">
          <Link to="/Home">Home</Link>
        </div>
        <div className="nav-item">
          <Link to="/members">Members</Link>
        </div>
        <div className="nav-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <a href="#">Trainings</a>
          {showDropdown && (
            <div className="dropdown">
              <Link to="/FormulaireFormation/add">Add Training</Link>
              <Link to="/Lister_Formations" >View Trainings</Link>
            </div>
          )}
        </div>
        <div className='nav-item'>
          <Link to="/SendCertifications">Send Certifications</Link>
        </div>
        <div className='nav-item'>
          <Link onClick={handleSignout}>SignOut</Link>
        </div>
      </div>
    </nav></>)
}

export default NavBar