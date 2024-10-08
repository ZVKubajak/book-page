import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../api/userAPI';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css';

export default function Signup() {
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [passwordisEmpty, setPasswordIsEmpty] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [signupData, setSignupData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedSignupData = {
      ...signupData,
      [name]: value
    };
    setSignupData(updatedSignupData);
    setDisableSubmit(
      updatedSignupData.username.trim() === '' || updatedSignupData.password.trim() === ''
    );
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setNameIsEmpty(value.trim() === '');
    }
    
    if (name === 'password') {
      setPasswordIsEmpty(value.trim() === '');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(signupData.username, signupData.password);
      navigate('/login'); // useLocation
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
          onBlur={handleBlur}
          id="username"
          className={`form-control border ${nameIsEmpty ? 'border-danger' : ''}`}
        />
        {nameIsEmpty && 
        	<div className='mt-2 text-danger'>
          	Name is required.
        	</div>
        }
        <label className='form-label mt-4'>Password</label>
        <input 
          type='password'
          name='password'
          value={signupData.password || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          id="password"
          className={`form-control border ${passwordisEmpty ? 'border-danger' : ''}`}
        />
        {passwordisEmpty && 
        	<div className="mt-2 text-danger">
          	Password is required.
        	</div>
        }
        <button disabled={disableSubmit} className="btn btn-outline-primary my-4" type='submit'>Register</button>
      </form>
    </div>
    
  )
};