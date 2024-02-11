<script lang="ts">
	import Map from './Map.svelte';
	import Controls from '@/components/Controls.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { currentCode, currentRound, currentScore, currentTrial, guessedCodes, message, totalScore } from '@/store';
	import { floor } from 'lodash';
	import { getRandomCode, getRegionName, getWasWordCorrectForm } from '@/lib';
	import { totalTrials } from '@/data';
	import Message from '@/components/Message.svelte';

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

		if (!regionElement ||
			regionElement.classList.contains('wrong') ||
			document.querySelector('.scrollable-wrapper').classList.contains('dragging')) return;

		if (regionElement.getAttribute('data-code') === $currentCode) {
			//guessed correctly
			$totalScore += $currentScore;
			$currentRound++;
			$guessedCodes.push($currentCode);
			setFlagAsBackground(regionElement.getAttribute('data-code'), regionElement);
			const regionName = getRegionName(document.querySelector(`[data-code="${$currentCode}"]`));
			$message = `Правильно! Это ${getWasWordCorrectForm(regionName)} ${regionName}`;
			resetMap();
		} else {
			// wrong region click
			regionElement.classList.add('wrong');
			$currentScore = floor($currentScore / 2);
			$currentTrial++;
			$message = 'Мимо!';
		}

		if ($currentTrial === totalTrials) {
			// it was last try
			const regionName = getRegionName(document.querySelector(`[data-code="${$currentCode}"]`));
			$message = $currentScore > 10 ? 'Ура!' : `Ладно, проехали... Это ${getWasWordCorrectForm(regionName)} ${regionName}`;
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
</script>


<div class="field">
	<Map />
	<Controls />
	<Message />
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