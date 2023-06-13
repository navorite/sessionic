import { isFirefox } from '@constants/env';
import type { compressOptions } from '../types/browser';
import type { Session } from '../types/extension';

export default (() => {
  if (!isFirefox) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = document.createElement('img');

  function optimizeFavIcons(url: string) {
    if (!url) return;

    return `https://www.google.com/s2/favicons?domain=${url}`;
  }

  async function icon(src: string, options?: compressOptions) {
    if (!ctx || !img || !src) return;

    return new Promise((resolve: (dataURL: string) => any) => {
      img.src = src;
      img.onload = (event) => {
        if (event.currentTarget instanceof HTMLImageElement) {
          if (
            !options.max_size ||
            options.max_size >= event.currentTarget.naturalWidth
          ) {
            options.max_size = event.currentTarget.naturalWidth;
            options.quality = 1;
          }

          ctx.canvas.height = options.max_size;
          ctx.canvas.width = options.max_size;

          ctx.drawImage(
            event.currentTarget,
            0,
            0,
            options.max_size,
            options.max_size
          );

          const data = ctx.canvas.toDataURL(options.type, options.quality);
          //console.log({ before: img.src.length, after: data.length });
          resolve(data);
        }
      };
    });
  }

  async function session(
    session: Session,
    options?: compressOptions
  ): Promise<unknown> {
    return new Promise(async (resolve) => {
      if (session?.windows?.length) {
        for (const window of session.windows) {
          for (const tab of window.tabs) {
            tab.favIconUrl = await icon(tab.favIconUrl, options);
          }
        }

        resolve(session);
      }
    });
  }

  return {
    optimizeFavIcons,
    icon,
    session,
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
