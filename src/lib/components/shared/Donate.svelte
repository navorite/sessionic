<script>
  import { DonateCard } from '@/lib/components';
  import { i18n } from 'webextension-polyfill';
</script>

<div>
  <p class="mb-4">
    {i18n.getMessage('aboutDonateText')}
  </p>

  <div class="flex flex-wrap gap-4">
    <div class="flex h-20 w-full justify-center gap-4">
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
        class="flex h-full items-center gap-2 rounded-md bg-[#f96854] p-2 font-bold text-black hover:brightness-125"
        ><img
          class="h-8"
          src="../../images/donate_patreon.png"
          alt="Donate using Patreon.com"
        />BECOME A PATRON</a
      >
    </div>

    <div class="flex w-full justify-center gap-4">
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
