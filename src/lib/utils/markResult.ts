export function markResult(
	string: string,
	match: string,
	options: { all?: boolean; case_sensitive?: boolean }
) {
	const pattern = new RegExp(
		match,
		`${options.all ? 'g' : ''}${options.case_sensitive ? '' : 'i'}`
	);
	return string?.replace(pattern, '<mark>$&</mark>');
}
