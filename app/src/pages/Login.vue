<script setup>
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { ref, reactive, computed } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthUserStore } from '@/store/authStore.mjs'
import { useUserStore } from '@/store/userStore.mjs'
import router from '@/router'

const schema = yup.object().shape({
  username: yup.string().required('Username cannot be empty'),
  password: yup
    .string()
    .min(8, 'Passwords must be at least 8')
    .required('Password cannot be empty'),
})

const authStore = useAuthUserStore()

var signedin = computed(() => {
  return authStore.signedIn
})

if (signedin.value) {
  useUserStore().loadUser()
  router.push('/profile')
}

var message = ref("")

function handleLogin(user) {
  authStore.signin(user).then(
    () => {
      useUserStore().loadUser()
      router.push('/profile')
    },
    (error) => {
      message.value =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
    },
  )
}
</script>

<template>
  <div class="flex w-screen h-screen justify-center bg-white">
    <div
      class="flex flex-col w-120 h-150 shadow-2xl border rounded-2xl items-center justify-center gap-5 mt-20"
    >
      <p class="text-4xl text-black font-bold">Log In</p>

      <div class="flex flex-row gap-2">
        <p class="flex text-1xl text-black">Doesn't have an account?</p>
        <RouterLink to="/signup" class="flex text-1xl text-amber-400 underline" href="#">
          Sign Up
        </RouterLink>
      </div>
      <div class="flex flex-col gap-2">
        <a
          class="flex flex-row gap-10 items-center justify-between border rounded-2xl px-3 hover:bg-green-400"
          href="#"
        >
          <p class="text-1xl text-black">Continue with Google</p>
          <font-awesome-icon size="xl" :icon="faGoogle" />
        </a>
        <a
          class="flex flex-row gap-10 items-center justify-between border rounded-2xl px-3 hover:bg-green-400"
          href="#"
        >
          <p class="text-1xl text-black">Continue with Facebook</p>
          <font-awesome-icon size="xl" :icon="faFacebook" />
        </a>
        <a
          class="flex flex-row gap-10 items-center justify-between border rounded-2xl px-3 hover:bg-green-400"
          href="#"
        >
          <p class="text-1xl text-black">Continue with Github</p>
          <font-awesome-icon size="xl" :icon="faGithub" />
        </a>
      </div>
      <p class="text-2xl text-black font-bold">Or</p>
      <Form @submit="handleLogin" :validation-schema="schema" name="login">
        <div class="flex flex-col gap-3">
          <div class="relative">
            <Field name="username">
              <template v-slot="{ field, meta }">
                <input
                  v-bind="field"
                  name="username"
                  type="text"
                  placeholder=" "
                  class="form-input peer"
                  :class="[meta.touched && !meta.valid ? 'border-red-500' : '']"
                />
                <label class="label-input"> Username </label>
                <span class="flex w-70 h-4 ml-1 items-center">
                  <Transition name="slide-fade-y-down">
                    <ErrorMessage name="username" class="error-text" />
                  </Transition>
                </span>
              </template>
            </Field>
          </div>
          <div class="relative">
            <Field name="password">
              <template v-slot="{ field, meta }">
                <input
                  v-bind="field"
                  name="password"
                  type="text"
                  placeholder=""
                  class="form-input peer"
                  :class="[meta.touched && !meta.valid ? 'border-red-500' : '']"
                />
                <label class="label-input"> Password </label>
                <span class="flex w-70 h-4 ml-1 items-center">
                  <Transition name="slide-fade-y-down">
                    <ErrorMessage name="password" class="error-text" />
                  </Transition>
                </span>
              </template>
            </Field>
          </div>
          <div class="flex flex-col gap-1">
            <span class="w-80 h-8 flex">
              <div v-if="message" class="py-2 px-6 w-80 bg-red-400 rounded-md">
                <div class="error-text">
                  {{ message }}
                </div>
              </div>
            </span>
            <button class="form-btn">Login</button>
          </div>
        </div>
      </Form>
      <div class="w-80 h-10 items-center">
        <div class="text-end">
          <RouterLink to="/fpassword" class="flex text-1xl text-amber-400 underline" href="#">
            Forgot password?
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
