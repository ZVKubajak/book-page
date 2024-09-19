import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../api/userAPI';
import './css/Signup.css';

export default function Signup() {
  const [signupData, setSignupData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(signupData.username, signupData.password);
      window.location.assign('/login');
    } catch (err) {
      console.error('Failed to sign up user', err);
    }
  };

  return (
    <div className='container d-flex flex-column'>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <h1 className='title mb-5'>Sign Up</h1>
        <label htmlFor="username" className="form-label">Username</label>
        <input 
          type='text'
          name='username'
          value={signupData.username || ''}
          onChange={handleChange}
          id="username"
          className="form-control mb-4"
        />
        <label className='form-label'>Password</label>
        <input 
          type='password'
          name='password'
          value={signupData.password || ''}
          onChange={handleChange}
          id="password"
          className="form-control"
        />
        <button className="btn btn-outline-primary my-4" type='submit'>Register</button>
      </form>
    </div>
    
  )
};