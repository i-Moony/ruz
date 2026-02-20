import { json } from "@sveltejs/kit";
import { fetchGroupSchedule, type GroupScheduleEntryRequest } from '../../../../lib/api/group-schedule';

const hashMap:Map<string, GroupScheduleEntryRequest[]> = new Map();

export async function GET({ url }) {
    const groupParam = url.searchParams.get("group");
    const startingDateParam = url.searchParams.get("startingDate");
    const endingDateParam = url.searchParams.get("endingDate");

    const group = groupParam ?? "155633";
    const startingDate = startingDateParam ? new Date(startingDateParam) : getMonday();
    const endingDate = endingDateParam ? new Date(endingDateParam) : getSunday();

    const cache = hashMap.get(`${group}-${startingDate}-${endingDate}`);

    if (cache)
        return json(cache, { status: 200 });

    console.log("Cache miss!");

    const test = await fetchGroupSchedule(group, startingDate, endingDate);

    hashMap.set(`${group}-${startingDate}-${endingDate}`, test);

	return json(test, { status: 200 });
}

function getMonday(): Date {
    const today = new Date();
    const weekday = today.getDay() || 7;

    if (weekday !== 1) {
        today.setHours(-24 * (weekday - 2));
    };

    today.setHours(0, 0, 0, 0);

    return today;
};

function getSunday(): Date {
    const today = new Date();
    const weekday = today.getDay() || 1;

    if (weekday !== 7) {
        today.setHours(24 * (8 - weekday));
    };

    today.setHours(0, 0, 0, 0);

    return today;
}
