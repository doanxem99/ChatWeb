<script setup>
import Logo from '../assets/logo.png'
import { useAuthUserStore } from '@/store/authStore.mjs';
import { computed, ref } from 'vue';
import { faCircleUser, faCircleInfo, faGear, faRightFromBracket,
         faBars, faMagnifyingGlass
 } from '@fortawesome/free-solid-svg-icons';

const authStore = useAuthUserStore();
var showProfile = ref(false);

var signedin = computed(() => {
    return authStore.status.signedIn;
});
var user = computed(() => {
    return authStore.user;
});

function signout() {
    showProfile = !showProfile;
    authStore.signout();
}

</script>

<template>
    <div class="fixed top-0 left-0 inset-x-0 shadow-lg bg-white">
        <div class="flex flex-row items-center">
            <div class="flex size-10 border rounded-2xl 
                        justify-center items-center">
                <font-awesome-icon size="xl" :icon="faBars"/>
            </div>
            <div class="flex flex-row text-center justify-between items-center
                        bg-var(--navbar-bg-color) h-12 w-screen px-2 sm:px-6
                        mb-1">
                <div class="flex gap-3">
                    <RouterLink class="flex items-center m-0 gap-1" to="/" aria-label="Home">
                        <img class="flex" :src="Logo" alt="logo" width="40" height="40">
                        <p class="flex text-2xl text-amber-400">VUE-CHATTER</p>
                    </RouterLink>
                    <div class="flex flex-row text-1xl text-black gap-5 
                                mt-auto mb-auto max-md:hidden">
                        <RouterLink class="flex hover:text-gray-400" to="/">Home</RouterLink>
                        <RouterLink class="flex hover:text-gray-400" to="/reel">Reel</RouterLink>
                        <RouterLink class="flex hover:text-gray-400" to="/chat">Chat</RouterLink>
                    </div> 
                </div>
                <div class="flex gap-5">
                    <div class="flex gap-1 rounded-2xl border-1 w-25 hover:w-40 h-8 
                                max-md:w-30 max-md:hover:w-45 transition-all
                                duration-200 ease-in items-center">
                        <font-awesome-icon class=" ml-2" :icon="faMagnifyingGlass"/>
                        <input class="flex mt-auto mb-auto w-15 hover:w-30 h-7
                                    max-md:w-20 max-md:hover:w-35 transition-all
                                    duration-200 ease-in text-sm focus:outline-none focus:ring-0"
                        type="text" placeholder="Search...">
                    </div>
                    <div class="flex flex-row text-1xl text-black gap-3 items-center
                                mt-auto mb-auto max-md:hidden">
                        
                        <RouterLink v-if="!signedin" class="flex hover:text-gray-400" to="/login">Log In</RouterLink>
                        <RouterLink v-if="!signedin" class="flex hover:text-gray-400" to="/signup">Sign Up</RouterLink>
                        <div class="">
                            <div v-if="signedin" v-on:click="showProfile = !showProfile" 
                                class=" border rounded-2xl w-35 h-8 flex 
                                        gap-0.5 justify-center items-center
                                        cursor-pointer">
                                <div class=" w-25 overflow-hidden">
                                    {{ user.username }}
                                </div>
                                <font-awesome-icon size="xl" :icon="faCircleUser"/>
                            </div>
                            <div v-if="showProfile" class=" p-2 absolute top-12 right-5 w-40 bg-white 
                                                            rounded-lg flex flex-col gap-4 shadow-2xl">
                                <RouterLink v-on:click="showProfile = !showProfile" class="flex hover:text-gray-400 gap-2" to="/profile">
                                    <font-awesome-icon size="xl" :icon="faCircleUser"/> 
                                    Profile
                                </RouterLink>
                                <div class="flex flex-row gap-2">
                                    <font-awesome-icon size="xl" :icon="faCircleInfo"/> 
                                    <p>Setting</p>
                                </div>
                                <div class="flex flex-row gap-2">
                                    <font-awesome-icon size="xl" :icon="faGear"/> 
                                    <p>Help & Contact</p>
                                </div>
                                <RouterLink v-on:click="signout" class="flex hover:text-gray-400 gap-2" to="/login">
                                    <font-awesome-icon size="xl" :icon="faRightFromBracket"/> 
                                    Sign Out
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
:root{
    --navbar-bg-color: rgb(33, 33, 33);
    --navbar-item-hover: rgb(93, 0, 255);
    --navbar-item-active: rgb(93, 0, 255);

}
.navbar {
    background-color: var(--navbar-bg-color);
    height: 50px;
    width: 100%;

    display: flex;
    position: fixed;
    align-items: stretch;
    text-align: center;

    top: 0;
    left: 0;
}

.navbar > div > img {
    margin: 0 10px;
}
</style>