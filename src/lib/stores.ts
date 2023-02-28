import { writable, type Writable } from 'svelte/store';
import type { Event } from './types';

export const liked: Writable<Set<Event>> = writable(new Set());
