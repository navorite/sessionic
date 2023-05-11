import browser from 'webextension-polyfill';

export async function getCurrentTabName() {
  return await browser?.tabs?.query({
    active: true,
    currentWindow: true,
  });
}
