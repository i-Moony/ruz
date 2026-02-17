<script lang="ts">
	import { parseGroupSchedule, type GroupScheduleEntry } from "$lib/api/group-schedule";
	import GroupPairGrid from "$lib/components/groupPairGrid.svelte";
	import { onMount } from "svelte";

    let isLoading = true;
    let data:GroupScheduleEntry[];

    onMount(async () => {
        const response = await fetch("/api/schedule/group");
        const json = await response.json();
        data = parseGroupSchedule(json).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        isLoading = false
    });
</script>

{#if isLoading}
    <h1>Loading data...</h1>
{:else}
    <GroupPairGrid entries={data}></GroupPairGrid>
{/if}
