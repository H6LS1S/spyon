<script lang="ts">
	import { cn } from '@/lib/utils';

	let {
		class: className = '',
		for: htmlFor,
		children,
	}: {
		class?: string;
		for?: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<label for={htmlFor} class={cn('text-sm font-medium', className)}>
	{@render children?.()}
</label>
