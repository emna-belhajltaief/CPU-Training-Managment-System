import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../../superbaseClient';
import './HomePage.css'

const HomePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchSupaBaseSession() {
            const session = await supabase.auth.getSession();
            return session;
        }
        async function getSupaBaseSession() {
            const session = await fetchSupaBaseSession()
            console.log("session", session)
        }
        getSupaBaseSession();
        const localSession = sessionStorage.getItem('supabaseSession');
        console.log("localSession", localSession)

    }, [])
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
            <div className='d-flex center_div'>
                <h1 className='CPU_Management '>CPU Trainings Managment System </h1>
                <button className='btn btn-secondary' onClick={() => navigate("/members")}>View members</button>
            </div>
        </>

    )
}

export default HomePage
