<script lang="ts">
	import { Sun, ChevronsLeft, Play, Pause } from 'lucide-svelte/icons';
	import { Router } from 'sv-router';

	import { navigate, route } from 'sv-router/generated';
	import { Button } from '@/lib/button';

	import { lobby } from '@/stores/lobby.store';

	let theme = $state(localStorage.getItem('theme') === 'dark');

	const changeTheme = () => {
		theme = !theme;
		document.documentElement.classList.toggle('dark', theme);
		localStorage.setItem('theme', theme ? 'dark' : 'light');
	};
</script>

<header class="m-6 flex items-center justify-between">
	<Button
		size="icon"
		variant="ghost"
		onclick={() => navigate(-1)}
		class={route.pathname === '/' ? 'invisible' : ''}
	>
		<ChevronsLeft />
	</Button>

	<Button
		size="icon"
		variant="ghost"
		class={route.pathname !== '/irl/game' ? 'invisible' : ''}
		onclick={() => ($lobby.paused = !$lobby.paused)}
	>
		{@const Icon = $lobby.paused ? Play : Pause}
		<Icon />
	</Button>

	<Button variant="ghost" size="icon" onclick={changeTheme}>
		<Sun />
	</Button>
</header>

<Router base={__BASE_PATH__} />

<footer class="flex flex-col items-center">
	<a
		href={__RELEASES_URL__}
		target="_blank"
		rel="noopener noreferrer"
		class="pt-3 text-xs text-muted-foreground"
	>
		v{__APP_VERSION__}
	</a>
</footer>
