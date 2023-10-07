const timeInMS = {
	yr: 31536000000,
	mo: 2628000000,
	day: 86400000,
	hr: 3600000,
	min: 60000
};

export function getRelativeTime(date: number) {
	const elapsed = Date.now() - date;

	for (const unit in timeInMS) {
		if (elapsed > timeInMS[unit as keyof typeof timeInMS]) {
			const val = Math.round(elapsed / timeInMS[unit as keyof typeof timeInMS]);

			return `${val} ${unit}`;
		}
	}

	return 'just now';
}
