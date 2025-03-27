import axios from 'axios'

const API_URL = 'http://localhost:5050/api/auth'

class AuthService {
  async signin(user) {
    return axios
      .post(API_URL + '/signin', {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  async signup(user) {
    return axios.post(API_URL + '/signup', {
      username: user.username,
      password: user.password,
      email: user.email,
    })
  }
}

export default new AuthService()
