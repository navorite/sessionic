export function markResult(
  string: string,
  match: string,
  all = false,
  case_sensitive = true
) {
  const pattern = new RegExp(
    match,
    `${all ? 'g' : ''}${case_sensitive ? '' : 'i'}`
  );

  return string.replace(pattern, '<mark>$&</mark>');
}
