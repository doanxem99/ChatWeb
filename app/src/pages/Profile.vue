<script setup>
import { ref, computed } from 'vue';
import { useAuthUserStore } from '@/store/authStore.mjs';
import router from '@/router';

var authStore = useAuthUserStore();

var currentUser = computed(() => {
    return authStore.user;
});

if (!currentUser.value) { 
  router.push("/login");
}
</script>

<template>
    <div class="mt-20" v-if="currentUser">
      <header class="jumbotron">
        <h3>
          <strong>{{currentUser.username}}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
      </p>
      <p>
        <strong>Id:</strong>
        {{currentUser.id}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
      </ul>
    </div>
</template>