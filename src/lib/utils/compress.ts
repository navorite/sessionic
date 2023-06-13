import { isFirefox } from '@constants/env';
import type { compressOptions } from '../types/browser';

export default (() => {
  if (!isFirefox) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = document.createElement('img');

  return {
    async icon(src: string, options?: compressOptions) {
      if (!ctx || !img || !src) return;

      return new Promise((resolve: (dataURL: string) => any) => {
        img.src = src;
        img.onload = (event) => {
          if (event.currentTarget instanceof HTMLImageElement) {
            let { max_size, quality } = options;

            if (!max_size || max_size >= event.currentTarget.naturalWidth) {
              max_size = event.currentTarget.naturalWidth;
              quality = 1;
            }

            ctx.canvas.height = max_size;
            ctx.canvas.width = max_size;

            ctx.drawImage(event.currentTarget, 0, 0, max_size, max_size);

            resolve(ctx.canvas.toDataURL(options.type, quality));
          }
        };
      });
    },
  };
})();

// const data = dataURI?.split(';base64,');

// if (data.length < 2) return;

// const type = data[0]?.split(':')[1];

// const decodedBinary = window.atob(data[1]);

// const binaryArr = new Uint8Array(decodedBinary.length);

// for (let i = 0; i < decodedBinary.length; i++)
//   binaryArr[i] = decodedBinary.charCodeAt(i);

// return URL.createObjectURL(new Blob([binaryArr], { type }));

/*function optimizeFavIcons(url: string) {
    if (!url) return;

    return `https://www.google.com/s2/favicons?domain=${url}`;
  }
*/
