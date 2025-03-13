<script setup>
import userService from '@/services/userService.mjs';
import { ref } from 'vue';

var content = ref();
var message = "";

userService.getPublicContent().then(
    (response) => {
        content.value = response.data;
        console.log(content);
    }, 
    (error) => {
        message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
    }
)
</script>

<template>
    <div class=" mt-20 ">
        <p>
            {{ content }}
        </p>
    </div>
</template>