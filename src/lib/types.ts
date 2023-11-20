export interface Event {
	date: {
		start: string;
		end: string;
		last_updated: string;
	};
	description: string;
	id: string;
	image_url: string;
	location: string;
	organizer: {
		name: string;
		email: string;
		website: string;
	};
	summary: string;
	url: string;
}

export interface BookedEvent {
	event: Event;
	f_name: string;
	l_name: string;
	email: string;
	tel: string;
}