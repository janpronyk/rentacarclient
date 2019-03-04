<template>
    <div class="ReservationForm p-4 bg-white mx-4 shadow-lg flex items-end">

      <div class="mr-4">
        <InputSelect :label="'Pickup Location'"
                     @onSelect="setLocation">

            <option value="null">--- choose location ---</option>

            <option v-for="(location, index) in locations"
                  :key="index"
                  :value="location.value">{{ location.label }}
          </option>

        </InputSelect>
      </div>

      <div class="mr-4">
        <label for="" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Pickup time</label>
        <datetime type="datetime"
                  input-class="block appearance-none w-full bg-grey-lighter
                  border border-grey-lighter text-grey-darker py-3 px-4 pr-8
                  rounded leading-tight focus:outline-none focus:bg-white
                  focus:border-grey mt-2"
                  :min-datetime="minDate"
                  @input="setDate($event, 'pickup')"></datetime>
      </div>

      <div>
        <label for="" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Drop off time</label>
        <datetime type="datetime"
                  input-class="block appearance-none w-full bg-grey-lighter
                  border border-grey-lighter text-grey-darker py-3 px-4 pr-8
                  rounded leading-tight focus:outline-none focus:bg-white
                  focus:border-grey mt-2 "
                  :min-datetime="minDate"
                  @input="setDate($event, 'dropoff')"></datetime>
      </div>

      <button class="bg-green text-white font-bold py-3 px-4 rounded ml-4"
              @click="filterVehicles">Filter vehicles</button>
    </div>
</template>

<script>

import InputSelect from '@/components/forms/partials/InputSelect'
import { Datetime } from 'vue-datetime'

export default {

  components: {
    InputSelect,
    Datetime
  },

  data() {
    return {
      pickupDate: this.$store.getters.pickupDate
    }
  },
  computed: {
    locations () {
      return this.$store.getters.allLocations
    },
    minDate () {
      const date = new Date(Date.now())
      return date.toISOString()
    }
  },

  methods: {
    filterVehicles () {
      this.$store.dispatch('filterVehiclesOnApi')
    },
    setLocation (id) {
      this.$store.dispatch('chooseLocation', id)
    },
    setDate (value, type) {
      this.$store.dispatch('chooseDates', { value, type })
    }
  }

}
</script>
