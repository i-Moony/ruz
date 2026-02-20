<script>
	import { goto } from "$app/navigation";
	import { getGroup } from "$lib/api/personal-schedule";
	import { onMount } from "svelte";

    onMount(() => {
        const groupId = getGroup();

        if (groupId)
            goto("/schedule/personal/");
    });
</script>
