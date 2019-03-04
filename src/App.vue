<template>
  <div id="app">
    <div id="nav">

      <NavBar>

        <router-link to="/" 
            class="block mt-4 lg:inline-block lg:mt-0 
            text-pink hover:text-white mr-4 no-underline">Home</router-link>
        <router-link to="/about" 
            class="block mt-4 lg:inline-block lg:mt-0 
            text-pink hover:text-white mr-4 no-underline">About</router-link>

      </NavBar>

      
    </div>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from '@/components/UI/Navbar'
  export default {

    components: {
      NavBar
    },

    mounted() {
      this.$store.dispatch('setLocations'),
      this.$store.dispatch('setVehicles')
    }
   
  }
</script>

