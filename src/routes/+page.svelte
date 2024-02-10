<script lang="ts">
	import '@/scss/main.scss';
	import MapField from '@/components/MapField.svelte';
	import Info from '@/components/Info.svelte';
	import { currentRound } from '@/store';
	import { totalRounds } from '@/data';
	import GameResults from '@/components/GameResults.svelte';
</script>

<div class="container">
	<h1 class="heading">Flagle - Россия</h1>
	{#if $currentRound <= totalRounds}
		<main class="grid">
			<Info />
			<MapField />
		</main>
	{:else}
		<GameResults />
	{/if}
</div>

<style lang="scss">
  .heading {
    text-align: center;
    margin-bottom: 4rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    align-items: stretch;

		@media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .container {
    margin-block: 5rem;
  }
</style>