import { defineStore } from "pinia";
import userService from "@/services/userService.mjs";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        friends: null
    }), 
    actions: {
        loadUser() {
            this.user = JSON.parse(localStorage.getItem('user'));
            return userService.getInfo(this.user.id).then(
                response => {
                    this.friends = response.data;
                    return Promise.resolve(response);
                }, 
                error => {
                    return Promise.reject(error);
                }
            );
        },
        loadFriends() {
            if (this.friends == null) {
                console.log(1);
                this.loadUser();
            }
            console.log(this.friends);
            return this.friends;
        },
        loadMessage() {

        },
        loadMoreMassge() {

        },
        sendMesssage() {

        }
    }
})