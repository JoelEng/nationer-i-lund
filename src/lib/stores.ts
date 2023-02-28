import { writable, type Writable } from 'svelte/store';

export const liked: Writable<Set<string>> = writable(new Set());
