<script>
	import { Home, Send, History, Settings } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data

	const project =data.project

	let paneItems = [
		{
			itemId: 0,
			icon: Home,
			hoverText: 'Project Home',
			action: `${$page.url.origin}/project/${project.id}`
		},
		{
			itemId: 1,
			icon: Send,
			hoverText: 'Notifications',
			action: `${$page.url.origin}/project/${project.id}/notifications`
		},
	];
</script>


<div class="flex h-screen shadow-lg">
	<div
		class="w-16 p-6 shadow-md border-r-2 border-animation flex flex-col justify-start items-center"
	>
		{#each paneItems as item (item.itemId)}
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="ghost" class="text-green-400" on:click={()=>goto(item.action)}>
						<svelte:component this={item.icon} />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{item.hoverText}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
	<div class="w-full">
		<slot/>
	</div>
</div>

