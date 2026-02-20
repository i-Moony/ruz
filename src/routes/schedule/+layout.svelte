<script lang="ts">
	let { children } = $props();
</script>

<header class="flex flex-row justify-between items-center p-3">
	<h1><strong>Финансовый Университет:</strong> Расписание</h1>
	<button class="border border-neutral-500 rounded-xl w-8 h-8 flex justify-center items-center bg-neutral-300">X</button>
</header>
<div class="flex flex-col gap-2 px-3 my-6">
	{@render children()}
</div>
<footer class="flex flex-col gap-0.5 px-3">
	<p>Сделал Кононов Данила</p>
</footer>
