import { defineStore } from "pinia";
import authService from "@/services/authService.mjs";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
    ? { status: { signedIn: true }, user }
    : { status: { signedIn: false}, user: null };

export const useAuthUserStore = defineStore('authuser', {
    state: () => initialState,
    actions: {
        signin(user) {
            return authService.signin(user).then(
                user => {
                    this.signinSuccess(user);
                    return Promise.resolve(user);
                },
                error => {
                    this.signinFailure();
                    return Promise.reject(error);
                }
            ) 
        },
        signup(user) {
            return authService.signup(user).then(
                user => {
                    this.signupSuccess();
                    return Promise.resolve(user);
                },
                error => {
                    this.signupFailure();
                    return Promise.reject(error);
                }
            );
        },
        signinSuccess(user) {
            this.status.signedIn = true;
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        signinFailure() {
            this.status.signedIn = false;
        },
        signout() {
            this.status.signedIn = false;
            this.user = null;
            localStorage.removeItem('user');
        },
        signupSuccess() {
            this.status.signedIn = false;
        },
        signupFailure() {
            this.status.signedIn = false;
        }
    }
});