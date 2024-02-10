<script lang="ts">
	import Map from './Map.svelte';
	import Controls from '@/components/Controls.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { currentCode, currentRound, currentScore, currentTrial, guessedCodes, totalScore } from '@/store';
	import { floor } from 'lodash';
	import { getRandomCode } from '@/lib';
	import { totalTrials } from '@/data';

	function resetMap() {
		for (let region of document.querySelectorAll('[data-code]')) {
			region.classList.remove('wrong');
		}
		$currentCode = getRandomCode();
		$currentScore = 100;
		$currentTrial = 1;
	}

	function setFlagAsBackground(code: string, regionElement: Element) {
		regionElement.style.fill = `url(#${code})`;
	}

	function tryGuess(event: Event) {
		const eventTarget = event.target as HTMLElement;
		const regionElement = eventTarget.closest('[data-code]');

		console.log(document.querySelector('.scrollable-wrapper')?.style.cursor);

		if (!regionElement ||
			regionElement.classList.contains('wrong') ||
			document.querySelector('.scrollable-wrapper').classList.contains('dragging')) return;

		if (regionElement.getAttribute('data-code') === $currentCode) {
			//guessed correctly
			$totalScore += $currentScore;
			$currentRound++;
			$guessedCodes.push($currentCode);
			resetMap();
			setFlagAsBackground(regionElement.getAttribute('data-code'), regionElement);
		} else {
			// wrong region click
			regionElement.classList.add('wrong');
			$currentScore = floor($currentScore / 2);
			$currentTrial++;
		}

		if ($currentTrial === totalTrials) {
			// it was last try
			resetMap();
			$currentRound++;
		}
	}


	onMount(() => {
		document.addEventListener('click', tryGuess);
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', tryGuess);
		}
	});

	$: {
		console.log($currentCode);
	}
</script>


<div class="field">
	<Map />
	<Controls />
</div>

<style lang="scss">
  .field {
    display: grid;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  :global(defs) {
    height: 0;
    display: inline-block;
  }
</style>