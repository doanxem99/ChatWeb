<script setup>
import {faMagnifyingGlass, 
        faCircleUser, 
        faBell,
        faCircleInfo,
        faVideo,
        faPhone,
        faImage,
        faPaperPlane
        } from '@fortawesome/free-solid-svg-icons'
import { reactive, ref, onMounted, watch, nextTick } from 'vue'
import { useUserStore } from '@/store/userStore.mjs'
import { Form, Field } from 'vee-validate';
import socket from '@/plugins/socket'

const userStore = useUserStore();
var infoConver = ref(true); 
var messageError = ref("");
var data = reactive({
  text: "",
  sender: null,
  receivers: []
})
const chatContainer = ref(null)
var user = JSON.parse(localStorage.getItem("user"))


function scrollToPosition () {
  if (chatContainer.value) {
    setTimeout(() => {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }, 10);
  }
}

onMounted(() => {
  scrollToPosition();
});

// Watch for changes in messages and scroll to the bottom
watch(() => userStore.messages.length, () => {
  scrollToPosition();
});

function handleScroll(event) {
  const container = event.target;
  if (container.scrollTop == 0) {
    // Logic to load more messages
    // useUserStore.loadMessage();
    console.log("End");
  }
}

function handleSendMessage(message, actions) {
  data = {
    roomchat: userStore.roomchat._id,
    text: message.text,
    sender: user.id
  };
  actions.setFieldValue('text');
  actions.setValues({
    text: ""
  });
  userStore.sendMesssage(data).then(
    (response) => {
  
    }, 
    (error) => {
      messageError.value =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        
        console.log(error);
  });
}

var oldMessage = null;
function checkTwoMessagesInBetween(message) {
  if (oldMessage == null) {
    oldMessage = message;
    return false;
  }
  const date1 = new Date(message.time);
  const date2 = new Date(oldMessage.time);
  const diff = Math.abs(date2 - date1);
  const diffMinutes = Math.floor(diff / 60000);
  oldMessage = message;
  return diffMinutes < 5;
}

function changeRoom(roomchat) {
  scrollToPosition();
  userStore.roomchat = roomchat;
}

</script>

<template>
  <div class="bg-gray-100 w-screen h-full flex flex-row">
    <!-- Sidebar chat -->
    <div class="h-screen border-e pb-0 w-90 max-md:w-20">
      <div class="flex flex-col gap-4 item-center">
        <!-- Header -->
        <div class="flex gap-3 justify-center item-center mt-2 pt-14">
          <h1 class="text-2xl">Đoạn chat</h1>
        </div>
  
        <!-- Search bar -->
        <div class="flex gap-1 rounded-2xl ml-2 mr-auto mb-2
                    border-1 w-75 justify-center items-center
                    max-md:hidden">
          <font-awesome-icon class="ml-2" :icon="faMagnifyingGlass" />
          <input
            class="flex mt-auto mb-auto w-65 h-7 focus:outline-none focus:ring-0"
            type="text"
            placeholder="Search..."
            name="roomchat"
          />
        </div>
  
        <!-- Scrollable list friends -->
        <div class="gap-2 h-9/12 overflow-y-auto w-full">
          <div v-for="roomchat in userStore.roomchats" class="w-full h-20 hover:bg-gray-300 rounded flex items-center">
            <div 
            @click="changeRoom(roomchat)" 
            class="h-full flex flex-row gap-2 items-center select-none cursor-pointer">
              <div class=" border rounded-full w-13 h-13">
              </div>
              <div class="flex flex-col gap-2 max-md:hidden ">
                <div class="">
                  {{ userStore.showName(roomchat) }}
                </div>
                <div class=" flex flex-row gap-1 text-sm text-gray-600">
                  <div class="w-50 overflow-x-clip">
                    {{ roomchat.lastMessage }}
                  </div>
                  <p>.</p>
                  <!-- Display only time of last message -->
                   {{ new Date(roomchat.time).toLocaleTimeString("en-US") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main chat -->
    <div class=" flex flex-wrap w-full">
      <div class="h-screen border-e pt-13 flex-3/4 flex-col flex">
        <!-- Header chat -->
        <div class="relative w-full h-14 p-3 shadow-2xl">
          <div class="absolute start-3">
            <div class="flex gap-2">
              <div class=" border rounded-full w-7 h-7">
              </div>
              <div>
                {{ userStore.showName(userStore.roomchat) }}
              </div>
            </div>
          </div>
          <div class=" absolute end-3">
            <div class="flex gap-5">
              <font-awesome-icon size="xl" :icon="faPhone" class="cursor-pointer"/>
              <font-awesome-icon size="xl" :icon="faVideo" class="cursor-pointer"/>
              <font-awesome-icon 
                @click="infoConver = !infoConver" 
                size="xl" 
                :icon="faCircleInfo" 
                class="cursor-pointer"/>
            </div>
          </div>
        </div>
        <!-- Chat content -->
        <div 
          class="w-full flex-1 pb-3 overflow-y-auto"
          ref="chatContainer"
          @scroll="handleScroll">
          <div
            class="flex flex-col justify-end">
            <div v-for="message in userStore.messages" 
                  class="text-sm mt-1">
              <!-- Display time and date when two messages are not in between 5 minutes -->
              <div 
                v-if="!checkTwoMessagesInBetween(message)"
                class="flex justify-center">
                <p class="text-xs text-gray-500">
                  {{ new Date(message.time).toLocaleString() }}
                </p>
              </div>
              <!-- Display message -->
              <div
                v-if="message.sender == userStore.user.id" 
                class="flex justify-end mr-2" >
                <div class="p-1 border rounded-2xl bg-blue-400"  >
                  {{ message.text }}
                </div>
              </div>
              <div
                v-if="message.sender != userStore.user.id"
                class="flex ml-2">
                <div class="p-1 border rounded-2xl"  >
                  {{ message.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Input message -->
        <Form @submit="handleSendMessage" name="messageinput">
            <div class="w-full h-15 mt-1 shadow-2xl shadow-black flex flex-wrap items-center justify-center p-3 gap-2">
              <font-awesome-icon size="xl" :icon="faImage" />
              <Field
                class=" flex-auto h-7 focus:outline-none focus:ring-0 border rounded-2xl
                       pl-3 max-sm:w-12"
                type="text"
                placeholder="Aa..."
                name="text"
              />
              <font-awesome-icon size="xl" :icon="faPaperPlane" />
            </div>
        </Form>
      </div>
      <!-- Info friend -->
      <div v-if="infoConver" class="h-screen justify-center items-center flex flex-1/4 flex-col 
                                    gap-4">
        <div class=" border rounded-full w-23 h-23">
        </div>
        <div class=" flex text-2xl ">
          {{ userStore.showName(userStore.roomchat) }}
        </div>
        <div class="flex flex-row gap-2">
          <div class="cursor-pointer flex rounded-full w-8 h-8 bg-gray-400 hover:bg-gray-500 items-center justify-center">
            <font-awesome-icon size="xl" :icon="faCircleUser" />
          </div>
          <div class="cursor-pointer flex rounded-full w-8 h-8 bg-gray-400 hover:bg-gray-500 items-center justify-center">
            <font-awesome-icon size="xl" :icon="faBell" />
          </div>
          <div class="cursor-pointer flex rounded-full w-8 h-8 bg-gray-400 hover:bg-gray-500 items-center justify-center">
            <font-awesome-icon size="xl" :icon="faMagnifyingGlass" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
