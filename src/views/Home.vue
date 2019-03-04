<template>
  <div class="home">

    <div class="HeroBlock  h-screen">
      <div class="flex justify-center bg-grey items-center h-64  w-full">

        <ReservationForm></ReservationForm>

      </div>

      <div class="container">
        <VehicleList />
      </div>
    </div>


  </div>
</template>

<script>
import ReservationForm from '@/components/forms/ReservationForm'
import VehicleList from '../components/VehicleList'

export default {
  name: 'home',

  components: {
    VehicleList,
    ReservationForm
  }
}
</script>
