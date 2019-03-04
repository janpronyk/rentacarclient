<template>
  <span class="inline-block rounded-full
        px-3 py-1 mb-3 ml-3 text-sm font-light text-white"
        :class="{'bg-green' : available, 'bg-grey': !available}">
        <template v-if="available">
          Available
        </template>
        <template v-else>
          Not available
        </template>
  </span>
</template>

<script>
export default {
  name: 'AvailabilityBadge',
  props: {
    available: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
