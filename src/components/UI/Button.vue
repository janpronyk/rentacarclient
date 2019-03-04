<template>

	<button 
		class="py-3 px-5 text-white text2x-1 mt-4"
		:class="{'bg-black' : dark, 'bg-grey': !dark}">
		<slot></slot>
	</button>

</template>

<script>
	export default {
		name: 'customButton',
		props: {
			dark: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

