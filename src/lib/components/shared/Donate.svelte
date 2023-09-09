<script>
	import { DonateCard } from '@/lib/components';
</script>

<div class="container">
	<p class="mb-4 text-center">
		Sessionic is free forever without ads, bloat or tracking. It takes a lot of
		my time in development. <br /> If you woud like to help me improve the extension,
		please consider donating using the links below :)
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
			<a
				href="https://paypal.me/navorite"
				target="_blank"
				class="h-full rounded-md bg-slate-200 px-8 py-2 hover:contrast-75"
				><img
					class="h-full"
					src="../../images/donate_paypal.webp"
					alt="Donate using PayPal.com"
				/></a
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
