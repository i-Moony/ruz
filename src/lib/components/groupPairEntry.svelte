<script lang="ts">
    import { GroupScheduleEntry } from "$lib/api/group-schedule";
    import Location from "$lib/assets/icons/location.svg";
    import Student from "$lib/assets/icons/student.svg";
    import Person from "$lib/assets/icons/person.svg";
    import Email from "$lib/assets/icons/email.svg";

    interface Props {
        entry: GroupScheduleEntry,
    };

    let { entry }: Props = $props();

    const colorCode = $derived(getBackgroundColor(entry.discipline.typeOfWork));

    const startTime = $derived(entry.startDate.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }));
    const endTime = $derived(entry.endDate.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }));
    const date = $derived(capitalize(entry.startDate.toLocaleDateString("ru", {day: "numeric", month: "long", weekday: "short"})));

    const name = $derived(entry.discipline.name);
    const typeOfWork = $derived(entry.discipline.typeOfWork);

    const buidling = $derived(entry.building.name);

    const auditorium = $derived(entry.auditoriumNumber);

    const group = $derived(entry.groupOrStream);

    const lecturer = $derived(entry.lecturer.name);
    const lecturerEmail = $derived(entry.lecturer.email);

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

    function capitalize(string:string):string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
</script>

<div class="p-2 rounded-2xl border flex flex-col gap-3 {colorCode}">
    <div class="flex flex-col gap-2.5 text-center">
        <h2 class="font-semibold text-xl leading-none">{name}</h2>
        <h3 class="italic text-sm leading-none">{typeOfWork}</h3>
    </div>
    <hr class="border-black">
    <div class="flex flex-col gap-0.5">
        <div class="flex flex-row gap-0.5 items-center">
            <img src={Location} alt="Location Icon" class="h-4.5 w-4.5">
            <p class="font-semibold text-base leading-none">{auditorium}</p>
        </div>
        <p class="text-sm italic">{buidling}</p>
    </div>
    <div class="flex flex-row gap-1 items-center">
        <img src={Student} alt="Student Icon" class="h-5.5 w-5.5">
        <p class="font-semibold text-base leading-none">{group}</p>
    </div>
    <div class="flex flex-col gap-0.5">
        <div class="flex flex-row gap-1 items-center">
            <img src={Person} alt="Location Icon" class="h-5 w-5">
            <p class="text-base font-semibold leading-none">{lecturer}</p>
        </div>
        {#if lecturerEmail}
            <div class="flex flex-row gap-1 items-center">
                <img src={Email} alt="Location Icon" class="h-5 w-5">
                <a href="mailto:{lecturerEmail}" class="text-base underline leading-none">
                    {lecturerEmail}
                </a>
            </div>
        {/if}
    </div>
    <hr class="border-black">
    <div class="flex flex-row justify-between items-center">
        <p class="text-lg leading-none font-semibold">{date}</p>
        <p class="text-nowrap text-lg font-semibold leading-none">{startTime} - {endTime}</p>
    </div>
</div>
