import { useState } from 'react'
import supabase from '../../../superbaseClient';
import './LogIn.css'

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData?.email,
      password: formData?.password,
    })
    console.log('Log In Data : ', formData);
    console.info('data : ', data);
    console.error('error : ', error);
  };

  return (
    <div className='login-container'>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='forum_label' htmlFor="email">Email:</label>
          <input className='input_forum' type="email" id="email" name="email" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className='forum_label' htmlFor="password">Password:</label>
          <input className='input_forum' type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default LogIn
