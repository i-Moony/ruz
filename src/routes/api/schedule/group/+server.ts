import { json } from "@sveltejs/kit";
import { fetchGroupSchedule } from '../../../../lib/api/group-schedule';

export async function GET({ url }) {
    const groupParam = url.searchParams.get("group");
    const startingDateParam = url.searchParams.get("startingDate");
    const endingDateParam = url.searchParams.get("endingDate");

    const group = groupParam ?? "155633";
    const startingDate = startingDateParam ? new Date(startingDateParam) : getMonday();
    const endingDate = endingDateParam ? new Date(endingDateParam) : getSunday();

    const test = await fetchGroupSchedule(group, startingDate, endingDate);

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
