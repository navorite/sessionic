export function generateScale(
  color: string,
  start: number = 1,
  end: number = 12
) {
  const length = end - start + 1;
  let palette = Array.from({ length }) as [[number, string]];
  for (let i = 0; i < length; i++) {
    palette[i] = [i + 1, `hsl(var(--${color}-${i + start}) / <alpha-value>)`];
  }

  return Object.fromEntries(palette);
}
