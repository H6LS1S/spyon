<script lang="ts">
	import { PRESETS, locations } from '@/stores';

	let expanded = $state<Record<string, boolean>>({});

	const toggle = (name: string) => locations.toggle(name);
	const toggleExpand = (name: string) => (expanded[name] = !expanded[name]);
</script>

<main class="container mx-auto flex h-full flex-col gap-3 overflow-y-auto px-6">
	{#each PRESETS as preset (preset.name)}
		{@const active = $locations.selected[preset.name]}
		{@const open = expanded[preset.name]}

		<div class="border">
			<div class="flex items-center">
				<button
					class="flex h-10 w-10 items-center justify-center border-r transition-colors"
					class:bg-primary={active}
					class:text-primary-foreground={active}
					class:text-transparent={!active}
					onclick={() => toggle(preset.name)}
				>
					✓
				</button>

				<button class="flex flex-1 items-center px-6" onclick={() => toggleExpand(preset.name)}>
					{preset.name}
				</button>
			</div>

			{#if open}
				<div class="border-t">
					{#each preset.locations as loc, i (i)}
						<div class="flex items-center border-b p-4 last:border-b-0">
							<span class="shrink-0 text-sm">{loc.name}</span>
							<span class="truncate pl-4 text-xs text-muted-foreground">
								{loc.roles.join(', ')}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</main>
