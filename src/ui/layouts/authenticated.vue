<template>
	<div class="bg-white">
		<main>
			<Nuxt />
		</main>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AuthenticatedLayout'
})
export default class AuthenticatedLayout extends Vue {
  mounted() {
    //
  }
}
</script>