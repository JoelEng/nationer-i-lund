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
	};
	summary: string;
	url: string;
}
