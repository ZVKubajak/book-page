import './css/Login.css';
import { useState, FormEvent, ChangeEvent } from "react";

import { loginUser } from "../api/userAPI";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [passwordisEmpty, setPasswordIsEmpty] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedLoginData = {
      ...loginData,
      [name]: value
    }
    setLoginData(updatedLoginData);
    
    // Update disableSubmit state based on the updatedLoginData
    setDisableSubmit(
      updatedLoginData.username.trim() === '' || updatedLoginData.password.trim() === ''
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

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginData.username, loginData.password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/search');
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='container d-flex flex-column'>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <h1 className='title mb-5'>Login</h1>
        <label htmlFor="username" className="form-label">Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
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
          value={loginData.password || ''}
          onChange={handleChange}
          id="password"
          className={`form-control border ${passwordisEmpty ? 'border-danger' : ''}`}
          onBlur={handleBlur}
        />
        {passwordisEmpty && 
        	<div className="mt-2 text-danger">
          	Password is required.
        	</div>
        }
        <button disabled={disableSubmit} className="btn btn-outline-primary my-4" type='submit'>Submit</button>
      </form>
      <div>
        <Link className="link-offset-3" to="/signup">Sign Up</Link>
      </div>
    </div>
    
  )
};

export default Login;
