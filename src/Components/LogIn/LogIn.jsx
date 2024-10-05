import React , {useState} from 'react'
import './LogIn.css' 

const LogIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
const handleChange = (e) => {
    setFormData({
        ...FormData,
        [e.target.name]: e.target.value,
    });
};
const handleSubmit = (e) =>
{
    e.preventDefault();
    console.log('Log In Data : ',formData);
};

  return (
    <div className='login-container'>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password"  id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default LogIn
