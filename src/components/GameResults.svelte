<script lang="ts">
	import { currentRound, currentScore, currentTrial, totalScore } from '@/store';

	function resetTheGame() {
		window.location.reload();
	}
</script>

<section class="gameResults">
	<h2>Игра окончена!</h2>
	<p>Вы набрали {$totalScore} очков.</p>
	<button class="again" on:click={resetTheGame}>Попробовать ещё раз</button>
</section>



<style lang="scss">
	.gameResults {
    text-align: center;
	}

	.again {
    padding: 1rem;
    margin-top: 1rem;
    font-size: inherit;
	}
</style>