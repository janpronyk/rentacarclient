<template>
  <div class="container flex justify-center mt-10 ">
    <div class="w-3/4 mb-5 rounded overflow-hidden shadow-lg">
      <img class="w-full" :src="vehicle.image.path" alt="Sunset in the mountains">
      <div class="px-6 py-4">

        <div class="font-bold text-xl mb-2 w-full">
          <span class="mr-3">{{ vehicle.name }}</span>
          <availability-badge :available="vehicle.available == 0 ? false : true"/>
          <p class="text-grey-darker text-base mb-5 mt-4" v-html="vehicle.description"></p>
        </div>
      </div>

      <div class="py-4 px-3">
        <div class="flex flex-wrap">
          <div class="w-1/2 px-6 py-4">
            <h4 class="mb-4">Available in locations:</h4>
            <span
              v-for="(location, index) in vehicle.locations"
              :key="index"
              class="inline-block bg-grey-lighter rounded-full
                    px-3 py-1 text-sm mb-3 mr-2 font-semibold text-grey-darker">#{{ location.title }}</span>
          </div>

        <div class="CarPrices w-1/2 p-3 border-1 ">
          <p>
            <span class="inline-block bg-grey-lighter rounded-full
                  px-3 py-1 mb-3 text-sm font-semibold text-grey-darker">price per day</span>
                  ${{ vehicle.price }}
          </p>
        
            <p class="mb-3">
              <span class="nline-block bg-grey-lighter rounded-full
                    px-3 py-1 text-sm mb-3 mr-2 font-semibold text-grey-darker">Reservation:</span>
                    <small>{{ dates.start }} - {{ dates.end }}</small></p>
        
            <p class="mb-3"><span class="nline-block bg-grey-lighter rounded-full
                    px-3 py-1 text-sm mb-3 mr-2 font-semibold text-grey-darker">No of days:</span>
                    {{ dates.days }}</p>
        
            <p class="mb-3"><span class="nline-block bg-orange rounded-full
                    px-3 py-1 text-sm mb-3 mr-2 font-semibold text-white">Total Price:</span> 
                    ${{ dates.price }}</p>
          </div>

          <button
            class="ml-auto text-white font-bold py-3 px-4 rounded ml-4 no-underline inline-block"
            :class="{'bg-grey': !vehicle.available, 'bg-green': vehicle.available}"
            @click="continueBtnClicked">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvailabilityBadge from '../components/UI/AvailabilityBadge';
import {DateTime} from 'luxon'

export default {
  name: 'Details',
  components: {AvailabilityBadge},
  beforeMount() {
    const slug = this.$route.params.slug
    this.$store.dispatch('getVehicle', slug)
    const { pickupDate, dropoffDate } = this.$store.getters
    const localPickupDate = localStorage.getItem('pickupDate')
    const localDropoffDate = localStorage.getItem('dropoffDate')
    if(!pickupDate || !localPickupDate) {
      this.$router.push({ name: 'home'})
    }

    console.log(pickupDate);
    
    
    if(pickupDate === '') {
      this.$store.dispatch('chooseDates', { localPickupDate, type: 'pickup' })
    }
    if(dropoffDate === '') {
      this.$store.dispatch('chooseDates', { localDropoffDate, type: 'pickup' })
    }
    
  },
  computed: {
    vehicle() {
      return this.$store.getters.currentVehicle
    },
    dates () {
      const { pickupDate, dropoffDate } = this.$store.getters
      const localPickupDate = localStorage.getItem('pickupDate')
      const localDropoffDate = localStorage.getItem('dropoffDate')
      const start = pickupDate ?
        DateTime.fromISO(pickupDate) : DateTime.fromISO(localPickupDate) 
      const end = dropoffDate ?
        DateTime.fromISO(dropoffDate) : DateTime.fromISO(localDropoffDate) 
      const daysBetween = end.diff(start, ['days'])
      const price = Math.round(this.vehicle.price * daysBetween.values.days)
      return { 
        start: start.toFormat('dd/MM/yyyy'), 
        end: end.toFormat('dd/MM/yyyy'), 
        days: Math.round(daysBetween.values.days), 
        price }
    }
  },
  methods: {
      continueBtnClicked() {
        console.log('Clicked');
        
        const token = this.$store.getters.token
        if(!this.vehicle.available) {
          alert('Sorry vehicle isn\'t available at selected dates.')
        } else if (!token || token === '') {
          this.$router.push({name: 'Login'})
        } else {
          this.$router.push({name: 'Confirmation'})
        }
      }
    }
}
</script>

<style scoped>

</style>
