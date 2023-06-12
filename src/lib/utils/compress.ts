export function compressDataURI(dataURI: string) {
  if (!dataURI) return;

  const data = dataURI?.split(';base64,');

  if (data.length < 2) return;

  const type = data[0]?.split(':')[1];

  const decodedBinary = window.atob(data[1]);

  const binaryArr = new Uint8Array(decodedBinary.length);

  for (let i = 0; i < decodedBinary.length; i++)
    binaryArr[i] = decodedBinary.charCodeAt(i);

  return URL.createObjectURL(new Blob([binaryArr], { type }));
}
