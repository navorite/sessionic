import '@styles';
import Options from './options.svelte';

const options = new Options({
  target: document.getElementById('root')!
});

export default options;
