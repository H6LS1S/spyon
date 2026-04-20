<script lang="ts">
	import { PRESETS, presets } from '@/stores/presets.store';

	let expanded = $state<Record<string, boolean>>({});

	const toggle = (id: string) => presets.toggle(id);
	const toggleExpand = (id: string) => (expanded[id] = !expanded[id]);
</script>

<main class="container mx-auto flex h-full flex-col gap-3 px-6">
	{#each PRESETS as preset (preset.id)}
		{@const active = $presets.selected[preset.id]}
		{@const open = expanded[preset.id]}

		<div class="border">
			<div class="flex items-center">
				<button
					class="flex h-10 w-10 items-center justify-center border-r transition-colors"
					class:bg-primary={active}
					class:text-primary-foreground={active}
					class:text-transparent={!active}
					onclick={() => toggle(preset.id)}
				>
					✓
				</button>

				<button class="flex flex-1 items-center px-6" onclick={() => toggleExpand(preset.id)}>
					{preset.name}
				</button>
			</div>

			{#if open}
				<div class="border-t">
					{#each preset.locations as loc, i (i)}
						<div class="flex items-center justify-between border-b p-4 last:border-b-0">
							<span class="text-sm">{loc.name}</span>
							<span class="text-xs text-muted-foreground">
								{loc.roles.slice(0, 4).join(', ')}…
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</main>
