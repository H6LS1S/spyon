<script lang="ts">
	import { ChevronsLeft } from 'lucide-svelte/icons';

	import { p } from 'sv-router/generated';

	import { Button, Switch, Label, Input } from '@/lib';
	import { lobby } from '@/stores';

	const handleKeydown = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		const name = target.value.trim();
		if (e.key !== 'Enter' || !name) return;

		$lobby.players[name] = {};
		target.value = '';
	};
</script>

<main class="container mx-auto flex h-full flex-col gap-6 overflow-hidden px-6">
	<div class="flex flex-col gap-3">
		<Label>Шпигунів — {$lobby.spies}</Label>
		<Input type="number" min={1} bind:value={$lobby.spies} />
	</div>

	<div class="flex flex-col gap-3">
		<Label>Тривалість ходу — {$lobby.duration} секунд</Label>
		<Input type="number" min={1} bind:value={$lobby.duration} />
	</div>

	<!--	<div class="flex gap-3">-->
	<!--		<Label class="flex-1">Голосування</Label>-->
	<!--		<Button-->
	<!--			class="flex-1"-->
	<!--			variant={$lobby.vote === VoteMode.ANYTIME ? 'default' : 'outline'}-->
	<!--			onclick={() => ($lobby.vote = VoteMode.ANYTIME)}-->
	<!--		>-->
	<!--			Будь-коли-->
	<!--		</Button>-->
	<!--		<Button-->
	<!--			class="flex-1"-->
	<!--			variant={$lobby.vote === VoteMode.END ? 'default' : 'outline'}-->
	<!--			onclick={() => ($lobby.vote = VoteMode.END)}-->
	<!--		>-->
	<!--			В кінці-->
	<!--		</Button>-->
	<!--	</div>-->

	<div class="flex items-center justify-between">
		<Label for="blind-spies">Шпигуни знають одне одного</Label>
		<Switch
			id="blind-spies"
			checked={$lobby.blindSpies}
			onCheckedChange={(v) => ($lobby.blindSpies = v)}
		/>
	</div>

	<div class="flex items-center justify-between">
		<Label>Набір локацій</Label>
		<Button size="icon" variant="secondary" class="rotate-180" href={p('/irl/locations')}>
			<ChevronsLeft />
		</Button>
	</div>

	<div class="flex items-center gap-3 border-t pt-6">
		<Label class="basis-1/4">Гравці ({$lobby.playerCount()})</Label>
		<Input class="basis-3/4" placeholder="Додати гравця..." onkeydown={handleKeydown} />
	</div>

	<div class="flex flex-1 flex-col gap-3 overflow-y-auto">
		{#each Object.entries($lobby.players) as [name] (name)}
			<Button variant="secondary" class="shrink-0" onclick={() => lobby.removePlayer(name)}>
				{name}
			</Button>
		{/each}
	</div>

	<Button
		href={p('/irl/deal')}
		disabled={$lobby.playerCount() < 3 || $lobby.playerCount() <= $lobby.spies * 2}
	>
		Старт
	</Button>
</main>
