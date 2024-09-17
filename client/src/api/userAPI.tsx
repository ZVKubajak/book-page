import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Registers a new user and sets the jwt token in local storage
 * @param username 
 * @param password 
 * @param email 
 */
const  registerUser = async (username: string, password: string, email: string) => {
  try {
    const res = await axios.post('/api/users', { username, email, password });
    localStorage.setItem('token', res.data.token);
    let navigate = useNavigate();
    navigate('/login');      

  } catch (error) {
    console.error('Registration error:', error);
  }
}

const loginUser = async (username: string, password: string) => {
  try {
    const res = await axios.post('/api/users/login', { username, password });
    return res.data;
  } catch (error) {
    console.error('Login error:', error);
  }
}

export { registerUser, loginUser };
