<script setup>
import { ref } from "vue"
import Navbar from "./components/Navbar.vue";

</script>

<template>

  <Navbar />
  <div class=" bg-gray-100 w-full h-full">
    <router-view v-slot="{ Component }">
        <!-- <transition name="slide-fade" mode="out-in"> -->
          <!-- Only using trasition for Navbar -->
          <component :is="Component" />
        <!-- </transition> -->
    </router-view>
  </div>
</template>

