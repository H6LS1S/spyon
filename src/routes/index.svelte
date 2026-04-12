<script>
	import { p } from 'sv-router/generated';

	import { Button } from '@/lib/button';
</script>

<main class="container mx-auto flex flex-col items-center justify-center gap-3 px-6">
	<Button class="w-full" href={p('/irl')}>Offline</Button>
	<Button disabled class="w-full">Online</Button>
</main>
