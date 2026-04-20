<script lang="ts">
	import { Lock } from 'lucide-svelte/icons';

	import { navigate } from 'sv-router/generated';

	import { locations, lobby } from '@/stores';

	if (!$lobby.playerCount()) navigate('/irl');

	let index = $state(0);
	let revealed = $state(false);

	$lobby.location = $locations.randomLocation();

	const roles = $lobby.getRandomRoles();

	const names = Object.keys($lobby.players);
	const spyNames = $derived(names.filter((_, i) => roles[i] === null));
	const otherSpies = $derived(spyNames.filter((n) => n !== names[index]));

	const next = () => {
		if (!revealed) {
			$lobby.players[names[index]] = { role: roles[index], time: $lobby.duration };
			return (revealed = true);
		}

		if (index === names.length - 1) return navigate('/irl/game');

		index++;
		revealed = false;
	};
</script>

<main>
	<button
		class="fixed inset-0 m-auto flex h-fit w-fit flex-col items-center justify-center font-bold uppercase"
		onclick={next}
	>
		{#if !revealed}
			<Lock size={72} class="animate-pulse text-muted-foreground" />
			<p class="text-3xl text-muted-foreground">{names[index]}</p>
		{:else}
			{@const player = $lobby.players[names[index]]}

			<p class="text-5xl">{player.role ? $lobby.location.name : '******'}</p>
			<div class="my-4 h-px w-full bg-border"></div>
			<p class="text-3xl">
				{player.role
					? roles[index]
					: $lobby.blindSpies && otherSpies.length
						? `Шпигуни: ` + otherSpies.join(', ')
						: 'Шпіон'}
			</p>
		{/if}
	</button>
</main>
