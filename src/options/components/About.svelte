<script>
  import DonateCard from './basic/DonateCard.svelte';
</script>

<h1 class="text-xl">About</h1>

<p>
  This extension was created by <a
    href="https://github.com/navorite"
    class="font-bold hover:text-primary-focus hover:underline">@navorite</a
  >
</p>

<h2 class="text-lg font-bold">Consider donating</h2>
<p class="mb-4">
  If you like the extension and would like me to continue improving the
  extension and adding new features to it, consider donating to any of the links
  below, I would really appreciate it :)
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
      href="https://www.patreon.com/navorite"
      target="_blank"
      class="flex items-center gap-2 h-full py-2 px-4 bg-[#f96854] text-black rounded-md hover:brightness-125 text-xl font-bold"
      ><img
        class="h-10"
        src="../../images/donate_patreon.png"
        alt="Donate using Patreon.com"
      />BECOME A PATRON</a
    >
    <a
      href="https://paypal.me/navorite"
      target="_blank"
      class="h-full py-2 px-8 bg-slate-200 rounded-md hover:contrast-75"
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
