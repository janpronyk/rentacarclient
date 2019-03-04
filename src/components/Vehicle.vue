<template>
  <div class="max-w-sm lg:w-1/4 mb-5 centered rounded overflow-hidden shadow-lg">
    <img class="w-full" :src="vehicle.image.path" alt="Sunset in the mountains">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 w-full">
        <span class="mr-3">{{ vehicle.name }}</span>
        <span class="inline-block bg-orange rounded-full
        px-3 py-1 mb-3 text-sm font-semibold text-white">${{ vehicle.price }} / day </span>

        <availability-badge :available="vehicle.available == 0 ? false : true" />
      </div>

      <p class="text-grey-darker text-base" v-html="vehicle.description"></p>
    </div>
    <div class="px-6 py-4">
      <span
        v-for="(location, index) in vehicle.locations"
        :key="index"
        class="inline-block bg-grey-lighter rounded-full
        px-3 py-1 text-sm mb-3 font-semibold text-grey-darker">#{{ location.title }}</span>

      <button class="block ml-auto ">
        <button @click="moreBtn"
                class="no-underline text-grey-darkest">
          More details
        </button>
      </button>

    </div>
  </div>
</template>

<script>
import AvailabilityBadge from './UI/AvailabilityBadge'
export default {
  name: 'Vehicle',
  components: {
    AvailabilityBadge
  },
  props: {
    vehicle: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    moreBtn() {
      const pickup = this.$store.getters.pickupDate
      const dropoff = this.$store.getters.dropoffDate
      if(!pickup || !dropoff ) {
        alert('Please select dates first')
        return
      } 
      this.$router.push({ name: 'vehicle details', params: { slug: this.vehicle.slug }})
    }
  }
}
</script>

<style scoped>

</style>
