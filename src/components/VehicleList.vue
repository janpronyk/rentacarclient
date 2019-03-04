<template>

  <div class="mt-4">

    <h3>Available vehicles: {{ vehicles.length }}</h3>
    <div class="flex flex-wrap  justify-around mt-4">
      <Vehicle v-for="(vehicle, index) in vehicles"
             :vehicle="vehicle"
             :key="index"></Vehicle>

    </div>

  </div>

</template>

<script>
import Vehicle from "./Vehicle";
export default {
  components: {
    Vehicle
  },

  data () {
    return {}
  },

  computed: {
    vehicles () {

      const all = this.$store.getters.allVehicles
      const filtered = this.$store.getters.filteredVehicles
      return filtered.length > 0 ? filtered : all
    }
  }
}
</script>
