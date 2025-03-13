import axios from "axios";
import authHeader from "./authHeader.mjs";

const API_URL = "http://localhost:5050/api/chatter";

class UserService {
    getMessages() {
        return axios.get(API_URL + '/messageaccess');
    }

    getInfo(userID) {
        return axios.get(API_URL + `/infoaccess/${userID}`, {
            headers: authHeader()
        });
    }

    getPublicContent() {
        return axios.get(API_URL + '/allaccess');
    }

    getUserContent() {
        return axios.get(API_URL + '/useraccess', { headers: authHeader() });
    }

    getModContent() {
        return axios.get(API_URL + '/useraccess', { headers: authHeader() });
    }

    getAdminContent() {
        return axios.get(API_URL + '/useraccess', { headers: authHeader() });
    }
}

export default new UserService();