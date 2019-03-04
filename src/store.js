import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import createPersistedState from 'vuex-persistedstate'

// TODO: for production enable encrypted cookies instead of createPersistedState

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    apiUrl: 'http://localhost/api/v1',
    vehicles: [],
    locations: [],
    filteredVehicles: [],
    currentVehicle: {},
    location: null,
    pickupDate: null,
    dropoffDate: null,
    token: '',
    user: {}
  },
  getters: {
    allVehicles: state => state.vehicles,
    allLocations: state => state.locations,
    filteredVehicles: state => state.filteredVehicles,
    currentVehicle: state => state.currentVehicle,
    pickupDate: state => state.pickupDate,
    dropoffDate: state => state.dropoffDate,
    user: state => state.user,
    token: state => state.token
  },
  mutations: {
    SET_VEHICLES: (state, vehicles) => {
      const { pickupDate, dropoffDate } = state
      state.vehicles = checkAvailability(vehicles, pickupDate, dropoffDate)
    },
    SET_VEHICLE: (state, vehicle) => {
      state.currentVehicle = vehicle
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_LOCATIONS: (state, locations) => {
      state.locations = locations
    },
    SET_LOCATION: (state, location) => {
      state.location = location
    },
    SET_PICKUP_DATE: (state, date) => {
      state.pickupDate = date
    },
    SET_DROPOFF_DATE: (state, date) => {
      state.dropoffDate = date
    },
    SET_FILTERED_VEHICLES: (state, vehicles) => {
      const { pickupDate, dropoffDate } = state
      state.filteredVehicles = checkAvailability(vehicles, pickupDate, dropoffDate)
    }
  },
  actions: {
    setVehicles ({ commit }) {
      axios('http://localhost/api/v1/vehicles')
        .then(res => commit('SET_VEHICLES', res.data))
        .catch(err => console.error('Error fetching vehicles', err))
    },

    setLocations ({ commit }) {
      axios('http://localhost/api/v1/locations/options')
        .then(res => commit('SET_LOCATIONS', res.data))
        .catch(err => console.error('Error fetching locations', err))
    },

    chooseLocation ({ commit, state }, id) {
      commit('SET_LOCATION', id)
    },

    chooseDates ({ commit, state }, date) {
      const { type, value } = date
      if (type === 'pickup') {
        commit('SET_PICKUP_DATE', value)
      } else {
        commit('SET_DROPOFF_DATE', value)
      }
    },

    registerUser ({ commit, state }, user) {
      axios.post(`http://localhost/api/auth/register`, user)
        .then(res => console.log(res))
        .catch(err => console.error('Error registering user', err))
    },

    loginUser ({ commit, state }, user) {
      axios.post(`http://localhost/api/auth/login`, user)
        .then(res => {
          const { token, user } = res.data
          commit('SET_TOKEN', token)
          commit('SET_USER', user)
          console.log(res)
          if (state.currentVehicle) {
            router.push({ name: 'Confirmation' })
            return
          }
          router.push({ name: 'home' })
        })
        .catch(err => console.error('Error logging in user', err))
    },

    filterVehiclesOnApi ({ commit, state }) {
      const { location, pickupDate, dropoffDate } = state
      let url = `http://localhost/api/v1/vehicles/filter/locations/${location}`
      if (pickupDate && dropoffDate) {
        url = `http://localhost/api/v1/vehicles/filter/locations/${location}/${pickupDate}/${dropoffDate}`
      }
      axios(url)
        .then(res => res.data.length > 0
          ? commit('SET_FILTERED_VEHICLES', res.data)
          : commit('SET_VEHICLES', state.vehicles))
        .catch(err => console.error('Error fetching filtered vehicles', err))
    },

    getVehicle ({ commit, state }, slug) {
      const { vehicles, filteredVehicles } = state
      let searchArray = []
      filteredVehicles.length > 0
        ? searchArray = filteredVehicles
        : searchArray = vehicles
      const vehicle = searchArray.filter(vehicle => vehicle.slug === slug)[0]
      commit('SET_VEHICLE', vehicle)
    },

    makeReservation ({ commit, state }, payload) {
      const authorization = {
        headers: {
          'Authorization': 'Bearer' + state.token
        }
      }
      axios.post(`${state.apiUrl}/reservation`, payload, authorization)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
  }
})
// Helpers
const checkAvailability = (vehicles, pickupDate, dropoffDate) => {
  vehicles.map(vehicle => {
    if (vehicle.dates.length > 0 && pickupDate && dropoffDate) {
      vehicle.dates.map(date => {
        const startDate1 = new Date(pickupDate)
        const endDate1 = new Date(dropoffDate)
        const startDate2 = new Date(date.pickup_date)
        const endDate2 = new Date(date.drop_date)
        if ((startDate1 < endDate2) && (startDate2 < endDate1)) {
          vehicle.available = 0
        } else {
          vehicle.available = 1
        }
      })
    }
  })
  return vehicles
}
