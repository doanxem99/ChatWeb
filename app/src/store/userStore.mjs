import { defineStore } from 'pinia'
import userService from '@/services/userService.mjs';
import { ref, watch } from 'vue';
import socket from '@/plugins/socket.js';


export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const friends = ref(JSON.parse(localStorage.getItem('friends')));
  const roomchats = ref(JSON.parse(localStorage.getItem('roomchats')));
  const roomchat = ref(roomchats.value ? roomchats.value[0] : null);
  const messages = ref([]);

  socket.on("message", (message) => {
    console.log("Receive message: ");
    if (roomchat.value && roomchat.value._id === message.roomchat) {
      messages.value.push(message);
    }
    if (roomchats.value) {
      const room = roomchats.value.find(room => room._id === message.roomchat);
      if (room) {
        room.lastMessage = message.text;
        room.time = message.time;
      }
    }
  });

  async function loadUser() {
    user.value = JSON.parse(localStorage.getItem('user'));
    if (!user.value) {
      return Promise.reject("User not found");
    }
    return userService.getInfo(user.value.id).then(response => {
      friends.value = response.data.friendList;
      roomchats.value = response.data.roomchatList;
      roomchat.value = roomchats.value[0];
      localStorage.setItem("friends", JSON.stringify(friends.value));
      localStorage.setItem("roomchats", JSON.stringify(roomchats.value));
      return Promise.resolve(response);
    }).catch(error => Promise.reject(error));
  };

  async function loadMessages() {
    if (!roomchat.value) return;
    return userService.loadMessage(roomchat.value._id).then(response => {
      messages.value = response.data.messages;
      return response;
    }).catch(error => {
      if (error.response.status === 401) {
        signout();
      }
      Promise.reject(error);
    })
  };

  loadMessages();
  if (roomchat.value) {
    socket.emit("joinRoom", roomchat.value._id);
  }
  // Watch roomchat and load messages when it changes
  watch(
    roomchat,
    (newRoom, oldRoom) => {
      if (oldRoom) {
        socket.emit("leaveRoom", oldRoom._id);
      }
      loadMessages();
      socket.emit("joinRoom", newRoom._id);
    });

  async function loadMoreMessage () {
    // logic to load more messages
  };

  async function sendMesssage(data) { 
    return userService.sendMessage(data)
      .then(response => {
        socket.emit("message", response.data.message);
        messages.value.push(response.data.message);
        const room = roomchats.value.find(room => room._id === response.data.message.roomchat);
        if (room) {
          room.lastMessage = response.data.message.text;
          room.time = response.data.message.time;
        }
      })
      .catch(error => Promise.reject(error));
  };

  function signout() {
    localStorage.removeItem('user');
    localStorage.removeItem('friends');
    localStorage.removeItem('roomchats');
    // this.$reset();
  }

  function showName(room) {
    if (!room) {
      return "";
    }
    if (!room.users) {
      return "";
    }
    if (room.name == "") {
      if (room.users.length > 2) {
        return "Group Chat";
      }
      const id = room.users.find(user => user !== this.user.id);
      if (!id) {
        return "";
      }
      let friend = friends.value.find(friend => friend._id === id);
      if (!friend) {
        return "";
      }
      return friend.username;
    }
    return room.name;
  }

  return { user, friends, roomchats, roomchat, messages, loadUser, loadMessages, loadMoreMessage, sendMesssage, showName, signout };
});
