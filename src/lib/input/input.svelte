<script lang="ts">
	import { cn } from '@/lib/utils';

	export interface InputProps {
		class?: string;
		value?: string | number;
		[key: string]: unknown;
	}

	let { class: className = '', value = $bindable(), ...rest }: InputProps = $props();
</script>

<input
	bind:value
	class={cn(
		'h-10 w-full bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground',
		className,
	)}
	{...rest}
/>
