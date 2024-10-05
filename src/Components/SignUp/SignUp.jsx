import  { useState } from 'react'
import './SignUp.css'

const SignUp = () => {
    const [FormData, setFormData] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData ({
            ...FormData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SignUp : ',FormData);
    };
  return (
    <div className='signup-container'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className='forum_label' htmlFor="username">Username</label>
                <input className='input_forum' type="text" id="username" name="username"  value={FormData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className='forum_label' htmlFor='password'>Password</label>
                <input className='input_forum' type="password" id="password" name="password" value={FormData.password} onChange={handleChange} required />               
            </div> 
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp
