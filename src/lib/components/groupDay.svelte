<script lang="ts">
    import { GroupScheduleEntry } from "$lib/api/group-schedule";
	import GroupPairEntry from "./groupPairEntry.svelte";

    interface Props {
        dayEntries: GroupScheduleEntry[],
    };

    let { dayEntries }: Props = $props();

    const date = $derived(dayEntries[0].startDate.toLocaleDateString("ru", {year: "numeric", month: "2-digit", day: "2-digit"}));
    const weekday = $derived(capitalize(dayEntries[0].startDate.toLocaleDateString("ru", {weekday: "long"})));

    function capitalize(string:string):string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
</script>

<div class="bg-neutral-400 rounded-3xl flex flex-col gap-4 p-2 py-4 items-center font-display">
    <div class="flex flex-col gap-0.5 items-center text-center text-xl font-semibold">
        <p>{weekday}, {date}</p>
    </div>
    <div class="flex flex-col gap-2 w-full">
        {#each dayEntries as entry}
            <GroupPairEntry {entry}></GroupPairEntry>
        {/each}
    </div>
</div>
