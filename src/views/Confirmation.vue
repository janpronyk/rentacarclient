<template>
    <div class="container pt-8">
        <div class="rounded overflow-hidden shadow-lg p-8">
            <h2 class="mb-0">Is this information correct?</h2>
            <ul class="my-8">
                <li>Name: <strong>{{ user.name }}</strong></li>
                <li>Surname: <strong>{{ user.surname }} </strong></li>
                <li>Vehicle: <strong>{{ vehicle.name }}</strong></li>
                <li>Pickup date: <strong>{{ pickupDate.formated }}</strong></li>
                <li>Drop Off date: <strong>{{ dropoffDate.formated }}</strong></li>
            </ul>
            <button class="bg-green text-white font-light py-3 px-4 rounded inline-block"
                @click="makeReservation">
                Make reservation
            </button>
        </div>

    </div>
</template>
<script>
import { DateTime } from 'luxon'
export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
        vehicle() {
            return this.$store.getters.currentVehicle
        },
        pickupDate() {
            const date = this.$store.getters.pickupDate
            return {
                original: date,
                formated: DateTime.fromISO(date).toFormat('dd/MM/yyyy')
            }
        },
        dropoffDate() {
            const date = this.$store.getters.dropoffDate
            return {
                original: date,
                formated: DateTime.fromISO(date).toFormat('dd/MM/yyyy')
            }
        }
    },
    methods: {
        makeReservation() {
            const reservationsData = new URLSearchParams()
            // Format dates to october cms standard
            const pickup = DateTime.fromISO(this.pickupDate.original).toFormat('yyyy-MM-dd HH:mm:ss')
            const dropoff = DateTime.fromISO(this.dropoffDate.original).toFormat('yyyy-MM-dd HH:mm:ss')
            
            reservationsData.append('user_id', this.user.id)
            reservationsData.append('vehicle_id', this.vehicle.id)
            reservationsData.append('pickupDate', pickup)
            reservationsData.append('dropoffDate', dropoff)
            this.$store.dispatch('makeReservation', reservationsData)
        }
    }

}
</script>
