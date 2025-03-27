import axios from 'axios'
import authHeader from './authHeader.mjs'

const API_URL = 'http://localhost:5050/api/chatter'

class UserService {
  getMessages() {
    return axios.get(API_URL + '/messageaccess')
  }

  sendMessage(data) {
    return axios.post(API_URL + '/messagesent', {
      roomchat: data.roomchat,
      text: data.text,
      sender: data.sender,
      date: new Date()
    }, {
      headers: authHeader(),
    });
  }

  loadMessage(friendID) {
    return axios.get(API_URL + `/messageload/${friendID}`, {
      headers: authHeader(),
    })
  }

  getInfo(userID) {
    return axios.get(API_URL + `/infoaccess/${userID}`, {
      headers: authHeader(),
    })
  }

  getPublicContent() {
    return axios.get(API_URL + '/allaccess')
  }

  getUserContent() {
    return axios.get(API_URL + '/useraccess', { headers: authHeader() })
  }

  getModContent() {
    return axios.get(API_URL + '/useraccess', { headers: authHeader() })
  }

  getAdminContent() {
    return axios.get(API_URL + '/useraccess', { headers: authHeader() })
  }
}

export default new UserService()
