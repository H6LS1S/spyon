<script lang="ts">
	import { cn } from '@/lib/utils';

	export interface LabelProps {
		class?: string;
		for?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', for: htmlFor, children }: LabelProps = $props();
</script>

<label for={htmlFor} class={cn('text-sm font-medium', className)}>
	{@render children?.()}
</label>
