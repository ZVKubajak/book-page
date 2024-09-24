class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  

  logout() {
    localStorage.removeItem('token');
  }
}

export default new AuthService();
