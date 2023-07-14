<script>
  import DonateCard from '@components/basic/DonateCard.svelte';
</script>

<div class="max-w-2xl">
  <p class="mb-4">
    If you like the extension and would like to help me continue improving the
    extension, you can donate to any of the links below, I really appreciate it
    :)
  </p>

  <div class="flex flex-wrap gap-4">
    <div class="w-full h-20 flex gap-4 justify-center">
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
        class="flex items-center gap-2 h-full p-2 bg-[#f96854] text-black rounded-md hover:brightness-125 font-bold"
        ><img
          class="h-8"
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
</div>
