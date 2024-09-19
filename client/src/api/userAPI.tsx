import axios from 'axios';

/**
 * Registers a new user and sets the jwt token in local storage
 * @param username 
 * @param password 

 */
const  registerUser = async (username: string, password: string) => {
  try {
    await axios.post('/api/register', { username, password });
  } catch (error) {
    console.error('Registration error:', error);
  }
}

const loginUser = async (username: string, password: string) => {
  try {
    const res = await axios.post('/api/login', { username, password });
    return res.data;
  } catch (error) {
    console.error('Login error:', error);
  }
}

export { registerUser, loginUser };
