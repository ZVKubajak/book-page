import './css/Login.css';
import { useState, FormEvent, ChangeEvent } from "react";

import { loginUser } from "../api/userAPI";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginData.username, loginData.password);
      localStorage.setItem('token', data.token);
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
          id="username"
          className="form-control mb-4"
        />
        <label className='form-label'>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
          id="password"
          className="form-control"
        />
        <button className="btn btn-outline-primary my-4" type='submit'>Submit</button>
      </form>
      <div>
        <Link className="link-offset-3" to="/signup">Sign Up</Link>
      </div>
    </div>
    
  )
};

export default Login;
