import { writable } from 'svelte/store';
import { getRandomCode } from '@/lib';

export const guessedCodes = writable([]);
export const zoom = writable(1);

export const currentCode = writable(getRandomCode());

export const currentScore = writable(100);
export const totalScore = writable(0);
export const currentRound = writable(1);
export const currentTrial = writable(1);
