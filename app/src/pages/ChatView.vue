<script setup>
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { reactive } from 'vue';
import { useUserStore } from '@/store/userStore.mjs';

var count = 12;
var friends = useUserStore().loadFriends();
</script>

<template>
    <div class=" bg-gray-100 w-screen h-full flex">
        <div class=" w-1/4 h-screen border-e flex-col gap-4 p-12 pb-0 items-center flex">
            <!-- Header -->
            <div class="flex flex-row gap-3 justify-center mt-2">
                <h1 class=" text-2xl ">Đoạn chat</h1>
                
            </div>

            <!-- Search bar -->
            <div class="flex gap-1 rounded-2xl border-1 w-75 justify-center items-center">
                <font-awesome-icon class=" ml-2" :icon="faMagnifyingGlass"/>
                        <input class="flex mt-auto mb-auto w-65 h-7 focus:outline-none focus:ring-0"
                        type="text" placeholder="Search...">
            </div>

            <!-- Scrollable list friends -->
            <div class="gap-2 w-90 h-200 overflow-y-auto">

                <div v-for="friend in friends" class=" w-full h-20 hover:bg-gray-300 rounded ">
                    {{ friend }}
                </div>
            </div>
        </div>
        <div class=" w-3/4 h-screen border-e pt-13 flex flex-col" >
            <div class="w-full h-1/12 border-b">

            </div>
            <div class="w-full h-7/9">

            </div>
            <div class="w-full border-t">

            </div>
        </div>
    </div>
</template>