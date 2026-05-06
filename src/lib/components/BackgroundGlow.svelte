<script lang="ts">
	let { 
		class: className = '', 
		color = 'bg-amber-100/70', 
		size = 'w-[600px] h-[600px]',
		blur = 'blur-[100px]',
		opacity = 'opacity-100'
	} = $props();
</script>

<div class="absolute rounded-full -z-10 pointer-events-none {color} {size} {blur} {opacity} {className}"></div>
