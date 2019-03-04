<template>
  <nav class="bg-grey-darkest">
    <div class="container flex items-center justify-between flex-wrap  p-6">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <span class="font-bold text-3xl tracking-tight">
        <router-link :to="{ name: 'home'}" class="no-underline text-white">
          Trotter
        </router-link>
        </span>
      </div>

      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>

            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      <div class="ml-auto">
        <div class="text-sm lg:flex-grow">
            <slot></slot>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {};
</script>

