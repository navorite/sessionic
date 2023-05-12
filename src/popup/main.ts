import '@styles/global.css';
import Popup from './popup.svelte';

const popup = new Popup({
  target: document.getElementById('root'),
});

export default popup;
