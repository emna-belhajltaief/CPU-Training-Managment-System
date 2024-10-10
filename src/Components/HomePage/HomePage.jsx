import './HomePage.css'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav>
                <div className="nav-logo">
                    <img src="./images/cpuwhite.png" alt="Logo" />
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
            <div className='d-flex'>
                <h1 className='CPU_Management '>CPU Trainings Managment System </h1>
                <button className='btn btn-secondary' onClick={() => navigate("/members")}>View members</button>
            </div>
        </>

    )
}

export default HomePage
