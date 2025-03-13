<script setup>
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {ref, reactive, computed} from "vue"
import * as yup from "yup";
import { useAuthUserStore } from "@/store/authStore.mjs";
import { Form, Field, ErrorMessage } from "vee-validate";
import router from "@/router";

const schema = yup.object().shape({
    username: yup.string().required("Username cannot be empty"),
    email: yup.string().email("Email must be valid").required("Email cannot be empty"),
    password: yup.string().min(8, "Passwords must be at least 8").required("Password cannot be empty"),
    confirmpassword: yup.string().required("ConfirmPassword cannot be empty").oneOf([yup.ref('password'), null], "Passwords must match")
})

var message = ref("");
var authStore = useAuthUserStore();

function handleSignUp(user) {
    authStore.signup(user).then(
        () => {
            router.push("./login");
        },
        (error) => {
            message.value =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
        }
    )
}

</script>

<template>
    <div class="flex w-screen h-screen justify-center bg-white">
        <div class="flex flex-col w-120 h-150 shadow-2xl border rounded-2xl
                    items-center justify-center gap-2 mt-20">
            <p class="text-4xl text-black font-bold">
                Sign Up
            </p>
            <div class="flex flex-row gap-2">
                <p class="flex text-1xl text-black">
                    Already have an account? 
                </p>
                <RouterLink to="/login" class="flex text-1xl text-amber-400 underline" href="#">
                    Log In
                </RouterLink>
            </div>
            <div class="flex flex-col gap-2">
                <a class="flex flex-row gap-10 items-center justify-between 
                            border rounded-2xl px-3 hover:bg-green-400" href="#">
                    <p class="text-1xl text-black">Continue with Google</p>
                    <font-awesome-icon size="xl" :icon="faGoogle"/>
                </a>
                <a class="flex flex-row gap-10 items-center justify-between
                            border rounded-2xl px-3 hover:bg-green-400" href="#">
                    <p class="text-1xl text-black">Continue with Facebook</p>
                    <font-awesome-icon size="xl" :icon="faFacebook"/>
                </a>
                <a class="flex flex-row gap-10 items-center justify-between
                            border rounded-2xl px-3 hover:bg-green-400" href="#">
                    <p class="text-1xl text-black">Continue with Github</p>
                    <font-awesome-icon size="xl" :icon="faGithub"/>
                </a>
            </div>
            <p class="text-2xl text-black font-bold">
                Or
            </p>
            <Form @submit="handleSignUp" :validation-schema="schema">
                <div class="flex flex-col gap-3">
                    <div class="relative">
                        <Field name="username">
                            <template v-slot="{ field, meta }">
                                <input
                                    v-bind=" field "
                                    name="username"
                                    type="text"
                                    placeholder=" "
                                    class="form-input peer"
                                    :class="[
                                        meta.touched && !meta.valid
                                        ? 'border-red-500'
                                        : ''
                                    ]"
                                />
                                <label class="label-input">
                                    Username
                                </label>
                                <span class=" flex w-70 h-4 ml-1 items-center ">
                                    <Transition name="slide-fade-y-down">
                                        <ErrorMessage name="username" class="error-text"/>
                                    </Transition>
                                </span>
                            </template>
                        </Field>
                    </div>
                    <div class="relative">
                        <Field name="email">
                            <template v-slot="{ field, meta }">
                                <input 
                                    v-bind=" field "
                                    name="email"
                                    type="text" 
                                    placeholder="" 
                                    class="form-input peer"
                                    :class="[
                                        meta.touched && !meta.valid
                                        ? 'border-red-500'
                                        : ''
                                    ]"
                                    />
                                <label class="label-input">
                                    Email
                                </label>
                                <span class="  flex w-70 h-4 ml-1 items-center ">
                                    <Transition name="slide-fade-y-down">
                                        <ErrorMessage name="email" class="error-text"/>
                                    </Transition>
                                </span>
                            </template>
                        </Field> 
                    </div>
                    <div class="relative">
                        <Field name="password">
                            <template v-slot="{ field, meta }">
                                <input
                                    v-bind=" field "
                                    name="password"
                                    type="text"
                                    placeholder=" "
                                    class="form-input peer"
                                    :class="[
                                        meta.touched && !meta.valid
                                        ? 'border-red-500'
                                        : ''
                                    ]"
                                />
                                <label class="label-input">
                                    Password
                                </label>
                                <span class=" flex w-70 h-4 ml-1 items-center ">
                                    <Transition name="slide-fade-y-down">
                                        <ErrorMessage name="password" class="error-text"/>
                                    </Transition>
                                </span>
                            </template>
                        </Field>
                    </div>
                    <div class="relative">
                        <Field name="confirmpassword">
                            <template v-slot="{ field, meta }">
                                <input 
                                    v-bind=" field "
                                    name="confirmpassword"
                                    type="text" 
                                    placeholder="" 
                                    class="form-input peer"
                                    :class="[
                                        meta.touched && !meta.valid
                                        ? 'border-red-500'
                                        : ''
                                    ]"
                                    />
                                <label class="label-input">
                                    Confirm Password
                                </label>
                                <span class="  flex w-70 h-4 ml-1 items-center ">
                                    <Transition name="slide-fade-y-down">
                                        <ErrorMessage name="confirmpassword" class="error-text"/>
                                    </Transition>
                                </span>
                            </template>
                        </Field> 
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class=" w-80 h-5">
                            <div v-if="message" class=" py-2 px-6 w-80 bg-red-400 rounded-md" role="alert">
                                <div class="error-text">
                                    {{ message }}
                                </div>
                            </div>
                        </span>
                        <button class="form-btn">
                            SignUp
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>