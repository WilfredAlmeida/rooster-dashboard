<script lang="ts">
	import Button from '$components/ui/button/button.svelte';
	import Input from '$components/ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	export let data;

	const supabase = data.supabase;

	let topics: string[] = data.project.topics || [];
	let newTopic = '';

	const addTopic = async () => {
		if (newTopic.trim() === '') {
			// topics = [...topics, newTopic];
			newTopic = ''; // Clear the input field
			return;
		}

		if (!topics.includes(newTopic.trim())) {
			console.log('Hi');

			topics = [newTopic, ...topics];

			const dbRes = await supabase
				.from('projects')
				.update({
					topics: topics
				})
				.eq('id', data.project.id);

			if (dbRes.error) {
				console.log(dbRes.error);
				return;
			}
			console.log(dbRes);
		}
	};
</script>

<div class="ml-12 text-white">
	<Label class="font-bold text-6xl">{data.project.name}</Label>
</div>

<div class="flex-col items-start justify-start p-6">
	<div class="border border-green-400 w-1/4 p-8">
		<h2 class="text-2xl font-semibold text-white mb-4">Create a List of Topics</h2>

		<div class="flex mb-4">
			<Input
				class="w-120 placeholder:text-white border-gray-300 text-white rounded-l-md py-2 px-4"
				type="text"
				placeholder="Enter a topic"
				bind:value={newTopic}
			/>

			<Button variant="ghost" class="border border-white text-green-400" on:click={addTopic}
				>Add</Button
			>
		</div>

		<!-- Display List of Topics -->
		<div class="w-64">
			<ul>
				{#each topics as topic (topic)}
					<div class="border border-white">
						<li class="text-white w-120 mb-2 p-2 rounded">
							{topic}
						</li>
					</div>
				{/each}
			</ul>
		</div>
	</div>
</div>

<div />
