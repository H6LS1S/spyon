<script lang="ts">
	import { cn } from '@/lib/utils';

	let {
		class: className = '',
		value = $bindable(),
		...rest
	}: {
		class?: string;
		value?: string | number;
		[key: string]: unknown;
	} = $props();
</script>

<input
	bind:value
	class={cn(
		'h-10 w-full bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground',
		className,
	)}
	{...rest}
/>
