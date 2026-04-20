<script lang="ts">
	export interface SwitchProps {
		id?: string;
		checked?: boolean;
		label?: string;
		onCheckedChange?: (v: boolean) => void;
	}

	let {
		id,
		checked = $bindable(false),
		label = 'Toggle switch',
		onCheckedChange,
	}: SwitchProps = $props();

	const toggle = () => {
		checked = !checked;
		onCheckedChange?.(checked);
	};
</script>

<button
	{id}
	type="button"
	role="switch"
	aria-checked={checked}
	aria-label={label}
	onclick={toggle}
	class="my-2 inline-flex h-6 w-10 cursor-pointer items-center transition-colors {checked
		? 'bg-primary'
		: 'bg-secondary'}"
>
	<span
		class="h-4 w-3
      {checked ? 'translate-x-6 bg-secondary' : 'translate-x-1 bg-primary'}"
	></span>
</button>
