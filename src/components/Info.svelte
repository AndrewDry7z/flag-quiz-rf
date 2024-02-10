<script lang="ts">
	import { currentCode, currentRound, currentTrial, totalScore } from '@/store';
	import { totalRounds, totalTrials } from '@/data';

	$: flagSrc = `/assets/images/flags/${$currentCode}.svg`;
</script>

{#if $currentRound <= totalRounds}
	<div class="info">
		<figure class="flag">
			{#if $currentCode}
				<img class="img" alt="ФЛАГ" draggable="false" src={flagSrc}>
			{/if}
		</figure>
		<div class="results">
			<p>Раунд: {$currentRound}/{totalRounds} | Попытка: {$currentTrial}/{totalTrials}</p>
			<p>Очки: {$totalScore}</p>
		</div>
	</div>
{/if}

<style lang="scss">
  .info {
    text-align: center;
    font-size: 2rem;
  }

  .flag {
    margin: 0;
    display: flex;
    justify-content: center;

    .img {
      width: 70%;
      height: fit-content;
    }
  }
</style>