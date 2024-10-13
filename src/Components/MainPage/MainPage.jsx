import './MainPage.css';
import NavBar from '../NavBar/NavBar';

//add code to get from the db trainings for this week

const formations = [
  {
    title: "Formation Dev : introduction HTML, CSS",
    date: "22/10/2024",
    location: "Spring Land",
    logo: "./images/HTML&CSS.png",
  },
  {
    title: "Formation Robotic : introduction stem32",
    date: "29/10/2024",
    location: "ISIMM-C11",
    logo: "./images/STM32.png",
  },
  {
    title: "Formation Dev : C++ for beginners",
    date: "9/11/2024",
    location: "Les Jumelles",
    logo: "./images/C++_logo.png",
  },
];

const MainPage = () => {
  

  return (
    <>

    <NavBar></NavBar>
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
            <button className="edit-btn">View</button>
            <button className="edit-btn">Open for check-in</button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default MainPage;
