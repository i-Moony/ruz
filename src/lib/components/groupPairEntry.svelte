<script lang="ts">
    import { GroupScheduleEntry } from "$lib/api/group-schedule";

    interface Props {
        entry: GroupScheduleEntry,
    };

    let { entry }: Props = $props();

    const colorCode = $derived(getBackgroundColor(entry.discipline.typeOfWork));

    const startTime = $derived(entry.startDate.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }));
    const endTime = $derived(entry.endDate.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }));

    const name = $derived(entry.discipline.name);
    const typeOfWork = $derived(entry.discipline.typeOfWork);

    const buidling = $derived(entry.building.name);

    const auditorium = $derived(entry.auditoriumNumber);

    let roomText = $state(`Аудитория ${auditorium}`);

    const auditoriumCapacity = $derived(entry.auditorium.capacity);

    if (auditoriumCapacity) {
        roomText += ` (Вместимость: ${auditoriumCapacity} человек(-а))`;
    };

    const group = $derived(entry.groupOrStream);

    const lecturer = $derived(entry.lecturer.name);

    let lecturerText = $state(`Преподаватель: ${lecturer}`);

    const lecturerEmail = $derived(entry.lecturer.email);

    if (lecturerEmail) {
        lecturerText += ` (${lecturerEmail})`;
    };

    function getBackgroundColor(typeOfWork:string): string {
        if (typeOfWork.includes("Лекции")) {
            return "bg-emerald-200 border-emerald-500";
        } else if (typeOfWork.includes("Практические")) {
            return "bg-amber-200 border-amber-500";
        } else if (typeOfWork.includes("Повторная")) {
            return "bg-pink-100 border-pink-500";
        };

        return "bg-neutral-200 border-neutral-500";
    };
</script>

<div class="p-2 rounded-2xl border flex flex-col gap-3 {colorCode}">
    <div class="flex flex-col gap-0.5">
        <p class="text-center font-semibold">{name}</p>
        <p>{typeOfWork}</p>
    </div>
    <div class="flex flex-col gap-0.5">
        <p>{buidling}</p>
        <p>{roomText}</p>
    </div>
    <div class="flex flex-col gap-0.5">
        <p>{group}</p>
        <p>{lecturerText}</p>
    </div>
    <div class="flex justify-end w-full">
        <p>{startTime} - {endTime}</p>
    </div>
</div>
