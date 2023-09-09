<script lang="ts">
	import { Clipboard } from '@/lib/components';

	export let srcIcon: string;
	export let src: string;
	export let title: string;

	export let address: string;
</script>

<div
	class="flex max-w-xs flex-col gap-4 rounded-md bg-[hsla(0,0%,60%,0.2)] p-4 font-semibold"
>
	<h3 class="flex items-center gap-2">
		<img class="h-5 w-5" src={srcIcon} alt={title} />
		{title}
	</h3>

	<div class="flex w-full items-center gap-4">
		<img
			class="h-20 w-20 rounded-md bg-white p-2"
			{src}
			alt="Donate using {title}"
		/>

		<div class="overflow-hidden text-xs">
			<h4 class="font-normal">Address</h4>
			<div class="mt-1 flex items-center gap-2">
				<p class="break-all text-sm">{address}</p>

				<Clipboard value={address} />
			</div>
		</div>
	</div>
</div>
