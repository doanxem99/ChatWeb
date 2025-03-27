import { defineStore } from 'pinia'
import authService from '@/services/authService.mjs'
import { ref } from 'vue';

export const useAuthUserStore = defineStore('authuser', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const signedIn = ref(user.value ? true : false);

  async function signin(userdata) {
    return authService.signin(userdata).then(
      (newuser) => {
        user.value = newuser;
        signedIn.value = true;
        localStorage.setItem('user', JSON.stringify(user.value));
        return Promise.resolve(user)
      },
      (error) => {
        signedIn.value = false;
        return Promise.reject(error)
    });
  }

  async function signup(user) {
    return authService.signup(user).then(
      (user) => {
        signedIn.value = false;
        return Promise.resolve(user)
      },
      (error) => {
        signedIn.value = false;
        this.signupFailure()
        return Promise.reject(error)
    });
  }

  function signout() {
    localStorage.removeItem('user');
    localStorage.removeItem('friends');
    localStorage.removeItem('roomchats');
    signedIn.value = false;
    user.value = null;
  }

  return {signedIn, user, signin, signout, signup};
});