<script lang="ts">
    import { GroupScheduleEntry } from "$lib/api/group-schedule";
	import GroupDay from "./groupDay.svelte";
	import GroupPairEntry from "./groupPairEntry.svelte";

    interface Props {
        entries: GroupScheduleEntry[],
    };

    let { entries }: Props = $props();

    let entriesByDayMatrix:GroupScheduleEntry[][] = $state([]);

    $effect(() => {
        entriesByDayMatrix = [];

        const sortedEntries = entries.toSorted((a, b) => a.startDate.getTime() - b.startDate.getTime());

        const entriesByDay:Map<string, GroupScheduleEntry[]> = new Map();

        for (const entry of sortedEntries) {
            const date = entry.startDate.toLocaleDateString("ru", {year: "numeric", month: "2-digit", day: "2-digit"});

            let entries = entriesByDay.get(date) ?? [];

            entries.push(entry);

            entriesByDay.set(date, entries);
        };

        const daysInChronoOrder = entriesByDay.keys().toArray().toSorted((a, b) => (new Date(a)).getTime() - (new Date(b)).getTime());

        for (const day of daysInChronoOrder) {
            const entries = entriesByDay.get(day);

            if (entries === undefined)
                continue;

            entriesByDayMatrix.push(entries);
        };
    });
</script>

<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    {#each entriesByDayMatrix as dayEntries}
        <GroupDay {dayEntries}></GroupDay>
    {/each}
</div>
