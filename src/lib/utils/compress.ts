import { isFirefox } from '@constants/env';
import log from './log';

export default (() => {
	if (!isFirefox) return;

	const img = document.createElement('img');
	const ctx = document.createElement('canvas').getContext('2d');

	return {
		async icon(src: string, tabURL: string, options?: compressOptions) {
			if (!ctx || !img || !src || !src.startsWith('data:')) return src;

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

						resolve(src.length > dataURL.length ? dataURL : src);
					}
				};
			});
		}
	};
})();
