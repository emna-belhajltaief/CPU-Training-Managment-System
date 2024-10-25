import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import './LogIn.css';

const LogIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false); // State for redirection
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.info('data : ', data);

    // Check for user and session
    if (data) {
      const { user, session } = data;
      console.info('user : ', user);
      console.info('session : ', session);
      sessionStorage.setItem('supabaseSession', JSON.stringify(data));

      if (user && session) {
        setRedirect(true); // Set redirect to true
      } else {
        console.log("Denied");
        setErrorMessage("Login failed. Please try again.");
      }
    }

    // Handle any errors returned from Supabase
    if (error) {
      console.error('error : ', error);
      setErrorMessage(error.message);
    }
  };

  // Redirect when redirect state is true
  if (redirect) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className='login-container'>
      <h2>Welcome Back!<br/>CPU Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='forum_label' htmlFor="email">Email:</label>
          <input
            className='input_forum'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="form-group">
          <label className='forum_label' htmlFor="password">Password:</label>
          <input
            className='input_forum'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
        <button type="submit">Login</button>
        <button onClick={()=>navigate('/signup')}>Signup</button>
      </form>
    </div>
  );
}

export default LogIn;
