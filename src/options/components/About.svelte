<script>
  import DonateCard from './basic/DonateCard.svelte';
</script>

<h1 class="text-xl">About</h1>

<p class="font-normal">
  This extension was created by <a
    href="https://github.com/navorite"
    class="font-bold">@navorite</a
  >
</p>

<h2 class="text-lg font-bold">Consider donating</h2>
<p class="font-normal mb-2">
  I develop the extension without adding any bloatware or tracking or stuff like
  that for free, so please consider donating to keep the extension development
  alive :)
</p>

<div class="flex flex-wrap gap-4">
  <div class="w-full h-24 flex gap-4 justify-center">
    <a
      href="https://ko-fi.com/navorite"
      target="_blank"
      class="h-full hover:brightness-110"
      ><img
        class="h-full"
        src="../../images/donate_kofi.webp"
        alt="Donate using Ko-fi.com"
      /></a
    >

    <a
      href="https://paypal.me/navorite"
      target="_blank"
      class="h-full py-2 px-8 bg-slate-200 rounded-md hover:brightness-110"
      ><img
        class="h-full"
        src="../../images/donate_paypal.webp"
        alt="Donate using PayPal.com"
      /></a
    >
  </div>

  <div class="w-full flex gap-4 justify-center">
    <DonateCard
      title="Bitcoin (BTC)"
      src="../../images/btc-qr.png"
      srcIcon="../../images/btc-icon.png"
      address="1Dsu6EHhQxZwtBN3RE4nXLVQrzTCKoMn2p"
    />
    <DonateCard
      title="Ethereum (ETH)"
      src="../../images/eth-qr.png"
      srcIcon="../../images/eth-icon.png"
      address="0xa088a54b3048a97d799b6455a7608f50cb4721e3"
    />
  </div>
</div>

<style>
  a {
    color: var(--neutral);
  }

  a:hover {
    color: var(--primary-focus);
    text-decoration: underline;
  }
</style>
