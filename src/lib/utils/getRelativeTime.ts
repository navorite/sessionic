const timeInMS = {
	year: 31536000000,
	month: 2628000000,
	day: 86400000,
	hour: 3600000,
	minute: 60000
};

export function getRelativeTime(date: number) {
	const elapsed = Date.now() - date;

	for (const unit in timeInMS) {
		if (elapsed > timeInMS[unit as keyof typeof timeInMS])
			return `${Math.round(elapsed / timeInMS[unit as keyof typeof timeInMS])}${
				unit[0]
			} ago`;
	}

	return 'just now';
}
