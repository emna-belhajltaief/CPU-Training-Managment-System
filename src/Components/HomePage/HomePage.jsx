import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
 <>
        <nav>
            <div className="nav-logo">
                <img src="./images/cpuwhite.png" alt="Logo"/>
            </div>
            <div className="nav-links">
               <Link to="/login">
                    <button >LogIn</button>
                </Link>
                <Link to="/signup">
                    <button>SignUp</button>
                </Link>
            </div>
        </nav>
        <h1 className='CPU_Management '>CPU Trainings Managment System </h1>
        </>

  )
}

export default HomePage
