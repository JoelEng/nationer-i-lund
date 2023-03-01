import { writable, type Writable } from 'svelte/store';
import type { Event } from './types';
import { browser } from '$app/environment';

let storedLikes: Event[] = [];

if (browser) {
	storedLikes = JSON.parse(localStorage.liked || '[]');
}

export const liked: Writable<Set<Event>> = writable(new Set(storedLikes));


if (browser) {
	liked.subscribe((set) => (localStorage.liked = JSON.stringify([...set])));
}


export const selectedOrganizers: Writable<Set<string>> = writable(new Set());