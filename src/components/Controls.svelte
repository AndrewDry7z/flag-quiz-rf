<script lang="ts">
	import { zoom } from '@/store';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	const zoomInterval = .1;

	const fieldElement = browser ? document.querySelector('.field') : null;

	function zoomIn() {
		if ($zoom <= 2) $zoom += zoomInterval;
	}

	function zoomOut() {
		if ($zoom > 1) $zoom -= zoomInterval;
	}


	function zoomMapOnWheelScroll(event) {
		event.preventDefault();
		if (!fieldElement || !fieldElement.contains(event.target)) return;
		event.deltaY > 0 ? zoomOut() : zoomIn();
	}

	onMount(() => {
		document.addEventListener('wheel', zoomMapOnWheelScroll);
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('wheel', zoomMapOnWheelScroll);
		}
	});
</script>

<div class="controls">
	<button class="control-btn zoom-in" on:click={zoomIn} />
	<button class="control-btn zoom-out" on:click={zoomOut} />
</div>


<style lang="scss">
  .controls {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 2rem;
    gap: .5rem;

    .control-btn {
      width: 2rem;
      height: 2rem;

      &:before {
        font-size: 1.5rem;
        text-align: center;
      }

      &.zoom-in:before {
        content: '+';
      }

      &.zoom-out:before {
        content: '–';
      }
    }
  }
</style>