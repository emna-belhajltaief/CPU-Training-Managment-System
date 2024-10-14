import { useState } from 'react'
import supabase from '../../../superbaseClient';
import './SignUp.css'

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let { data, error } = await supabase.auth.signUp({
            email: formData?.email,
            password: formData?.password
        })
        alert("Check your mail to confirm sign up")
        console.log('SignUp : ', formData);
        console.info('data : ', data);
        console.error('error : ', error);
    };
    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='forum_label' htmlFor="email">Email</label>
                    <input className='input_forum' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className='forum_label' htmlFor='password'>Password</label>
                    <input className='input_forum' type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
