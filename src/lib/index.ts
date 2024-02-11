import { sample } from 'lodash';
import { browser } from '$app/environment';
import { guessedCodes } from '@/store';
import { get } from 'svelte/store';

export const codesList = browser ? [...document.querySelectorAll('[data-code]')].map(el => el.getAttribute('data-code')) : [];

export const getRandomCode = () => sample(codesList.filter(code => !get(guessedCodes).includes(code)));

export function getRegionName(regionElement: Element) {
	return regionElement.getAttribute('data-title');
}

export function getWasWordCorrectForm(regionName: string) {
	let was = 'была';
	if (regionName.includes('край') || regionName.includes('округ') || regionName === ('Санкт-Петербург')) {
    was = 'был';
  }
	return was;
}