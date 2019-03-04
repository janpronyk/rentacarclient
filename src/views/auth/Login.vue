<template>
    <div class="container pt-8" >
        <div class="rounded overflow-hidden shadow-lg p-8">
            <div>
                <div class="block mb-10">
                    <h2 class="mb-8">Login</h2>
                </div>

                <form class="w-full max-w-md" @submit.prevent="loginUser">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="email">
                                Email
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey" 
                            id="email" name="email" type="email" v-model="email">
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="password">
                                Password
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey" 
                            id="password" type="password" name="password" v-model="password">
                        </div>
                    </div>
                    <div class="flex flex-column justify-center">
                        <button class="bg-green text-white font-bold py-3 px-4 rounded ml-4 inline-block"> Login </button>
                       
                    </div>
                    <div class="flex flex-column justify-center mt-5">
                         <p class="block">No account? 
                            <router-link 
                                :to="{ name: 'Signup'}">
                                Register here.
                            </router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'reservation',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        loginUser() {
            const user = new URLSearchParams()
            user.append('login', this.email)
            user.append('password', this.password)
            this.$store.dispatch('loginUser', user)
        }
    }
}
</script>
