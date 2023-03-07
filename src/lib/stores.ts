import { writable, type Writable } from 'svelte/store';
import type { Event, BookedEvent } from './types';
import { browser } from '$app/environment';

//Likes are the events that have been marked as liked by the user
let storedLikes: Event[] = [];

if (browser) {
	storedLikes = JSON.parse(localStorage.liked || '[]');
}

export const liked: Writable<Set<Event>> = writable(new Set(storedLikes));

if (browser) {
	liked.subscribe((set) => (localStorage.liked = JSON.stringify([...set])));
}

//booked are the events that have been booked by the user
let bookedEvents: BookedEvent[] = [];

if (browser) {
	bookedEvents = JSON.parse(localStorage.booked || '[]');
}

export const booked: Writable<Set<BookedEvent>> = writable(new Set(bookedEvents));

if(browser) {
	booked.subscribe((set) => (localStorage.booked = JSON.stringify([...set])));
}


export const selectedOrganizers: Writable<Set<string>> = writable(new Set());
export const indexDay: Writable<Date> = writable(new Date());
