<script lang="ts">
	import { navigate } from 'sv-router/generated';
	import { onDestroy } from 'svelte';

	import { lobby } from '@/stores/lobby.store';

	if (!$lobby.location) navigate('/irl');

	let index = $state(0);

	$lobby.paused = false;

	const names = $derived(Object.keys($lobby.players));
	const interval = setInterval(() => {
		if ($lobby.paused) return;
		const p = $lobby.players[names[index]];
		if (!p.time || p.time <= 0) return;
		$lobby.players[names[index]].time = p.time - 1;
	}, 1000);

	onDestroy(() => clearInterval(interval));

	/** @param s - seconds */
	const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
	const next = () => (index = (index + 1) % names.length);
</script>

<main>
	<button
		class="fixed inset-0 m-auto flex h-fit w-fit flex-col items-center justify-center font-bold uppercase"
		onclick={next}
	>
		<span class="text-7xl">
			{fmt($lobby.players[names[index]]?.time ?? 0)}
		</span>
		<span class="text-3xl text-muted-foreground">{names[index]}</span>
		<!--		<span class="text-muted-foreground italic">Запитання або підказка</span>-->
	</button>
</main>
