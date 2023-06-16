import { isFirefox } from '@constants/env';

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

            const dataURL = ctx.canvas.toDataURL(options.type, quality);

            if (dataURL.length > src.length) resolve(src);

            resolve(dataURL);
          }
        };
      });
    },
  };
})();
