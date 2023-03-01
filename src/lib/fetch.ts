import type { Event } from './types';

const URL = 'https://qibf0o2lib.execute-api.eu-north-1.amazonaws.com/production/day/';

export const getDay = async (date: Date) => {
	const res = await fetch(
		URL +
			toISODate(date) +
			'?' +
			new URLSearchParams({
				all: '1'
			})
	);
	let list: Event[] = await res.json();
	list = list.filter((event) => new Date(event.date.start).getDate() == date.getDate());
	return list;
};

const toISODate = (date: Date) => {
	return date.toISOString().substring(0, 10);
};
