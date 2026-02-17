export async function fetchGroupSchedule(
	groupId: string,
	dateStart: Date,
	dateEnd: Date,
	language: number = 1
): Promise<GroupScheduleEntryRequest[]> {
	const startingDate = dateStart.toISOString().replaceAll('-', '.').split("T")[0];
	const endingDate = dateEnd.toISOString().replaceAll('-', '.').split("T")[0];

	const url = `https://ruz.fa.ru/api/schedule/group/${groupId}?start=${startingDate}&finish=${endingDate}&lng=${language}`;

	const requestResult = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",

		}
	});

	const data = (await requestResult.json()) as GroupScheduleEntryRequest[];



	return data;
}

export function parseGroupSchedule(entries:GroupScheduleEntryRequest[]):GroupScheduleEntry[] {
	const schedule: GroupScheduleEntry[] = [];

	for (const entry of entries) {
		schedule.push(new GroupScheduleEntry(entry));
	}

	return schedule;
};

export class GroupScheduleEntry {
	public constructor(request: GroupScheduleEntryRequest) {
		this.auditorium = {
			name: request.auditorium,
			capacity: request.auditoriumAmount,
			id: request.auditoriumOid
		};

		this.building = {
			name: request.building,
			id: request.buildingOid
		};

		this.startDate = GroupScheduleEntry.convertDate(request.date, request.beginLesson);
		this.endDate = GroupScheduleEntry.convertDate(request.date, request.endLesson);

		this.discipline = {
			name: request.discipline,
			id: request.disciplineOid,
			typeOfWork: request.kindOfWork,
		};

		this.group = {
			name: request.group,
			id: request.groupOid,
			stream: request.stream,
		};

		this.lecturer = {
			name: request.lecturer,
			email: request.lecturerEmail,
			id: request.lecturerOid,
		};
	}

	public readonly auditorium: Auditorium;
	public readonly building: Building;
	public readonly startDate: Date;
	public readonly endDate: Date;
	public readonly discipline: Discipline;
	public readonly group: Group;
	public readonly lecturer: Lecturer;

	public get auditoriumNumber():string {
		return this.auditorium.name.split("/")[1].replaceAll("ауд.", "");
	}

	public get groupOrStream():string {
		return this.group.name ?? this.group.stream ?? "";
	}

	private static convertDate(date: string, time: string): Date {
		return new Date(`${date}T${time}+03:00`);
	}
}

interface Auditorium {
	name: string;
	capacity?: number;
	id: number;
}

interface Building {
	name: string;
	id: number;
}

interface Discipline {
	name: string;
	id: number;
	typeOfWork: string;
}

interface Group {
	name?: string;
	id: number;
	stream?: string;
}

interface Lecturer {
	name: string;
	email?: string;
	id: number;
}

interface GroupScheduleEntryRequest {
	/* Auditorium number and location in short form */
	auditorium: string;
	/* Audotorium capacity */
	auditoriumAmount?: number;
	/* Auditorium GUID (usually is not usable) */
	auditoriumGUID?: string;
	/* Auditorium internal id */
	auditoriumOid: number;
	/* Who edited the entry */
	author?: string;
	/* Time when lesson begins */
	beginLesson: string;
	/* Building location */
	building: string;
	/* Building G id (IDK) */
	buildingGid?: number;
	/* Building internal id */
	buildingOid: number;
	contentOfLoadOid: number;
	contentOfLoadUID?: string;
	contentTableOfLessonsName?: number;
	contentTableOfLessonsOid: number;
	createddate: string;
	date: string;
	dateOfNest?: string;
	dayOfWeek: number;
	dayOfWeekString: string;
	detailInfo?: string;
	discipline: string;
	disciplineOid: number;
	disciplineASAV_UID?: string;
	disciplineinplan?: number;
	disciplinetypeload?: number;
	duration: number;
	endLesson: string;
	group: string;
	groupGUID?: string;
	groupOid: number;
	groupUID?: string;
	group_facultyoid?: number;
	group_facultyASAV_UID?: string;
	group_facultyHR_UID?: string;
	group_facultyUID?: string;
	groupHR_UID?: string;
	groupASAV_UID?: string;
	groupMDM_UID?: string;
	hideincapacity?: number;
	isBan?: number;
	kindOfWork: string;
	kindOfWorkComplexity?: number;
	kindOfWorkOid?: number;
	kindOfWorkUid?: string;
	personHR_Person_ID?: number;
	personMDM_Person_UID?: string;
	lecturer: string;
	lecturerCustomUID?: string;
	lecturerEmail?: string;
	lecturerGUID?: string;
	lecturerOid: number;
	lecturerUID?: string;
	lecturer_postUID?: string;
	lecturer_postASAV_UID?: string;
	lecturer_postMDM_UID?: string;
	lecturerASAV_UID?: string;
	lecturerMDM_UID?: string;
	lecturer_rank?: string;
	lecturer_title?: string;
	lessonNumberEnd?: number;
	lessonNumberStart?: number;
	lessonOid?: number;
	listGroups?: GroupScheduleEntryRequestGroup[];
	listSubGroup?: unknown;
	listOfLecturers?: GroupScheduleEntryRequestLecturer[];
	modifieddate?: string;
	note?: string;
	note_description?: string;
	parentschedule?: string;
	replaces?: string;
	stream?: string;
	streamOid?: number;
	stream_facultyoid?: number;
	subGroup?: string;
	subGroupOid?: number;
	subgroup_facultyoid?: number;
	tableofLessonsName?: string;
	tableofLessonsOid?: number;
	typeOfContingent?: number;
	url1?: string;
	url1_description?: string;
	url2?: string;
	url2_description?: string;
	deletion_mark?: number;
	openlesson?: number;
	auditoriumfloor?: number;
	packageNumber?: number;
	disciplineUid?: string;
	streamUid?: string;
	subgroupUid?: string;
	groupSP_Uid?: string;
	group_faculty_SP_Uid?: string;
}

interface GroupScheduleEntryRequestGroup {
	group: string;
	groupASAV_UID?: string;
	groupGUID?: string;
	groupGid?: number;
	groupMDM_UID?: string;
	groupOid: number;
	groupSP_Uid?: string;
	groupUID?: string;
	group_facultyASAV_UID?: string;
	group_facultyHR_UID?: string;
	group_facultyUID?: string;
	group_faculty_SP_Uid?: string;
	group_facultyname?: string;
	group_facultyoid: number;
}

interface GroupScheduleEntryRequestLecturer {
	lecturer: string;
	lecturerASAV_UID?: string;
	lecturerCustomUID?: string;
	lecturerEmail?: string;
	lecturerGUID?: string;
	lecturerMDM_UID?: string;
	lecturerOid: number;
	lecturerUID?: string;
	lecturer_postASAV_UID?: string;
	lecturer_postMDM_UID?: string;
	lecturer_postUID?: string;
	lecturer_post_oid?: number;
	lecturer_rank?: string;
	lecturer_title?: string;
	personHR_Person_ID?: string;
	personMDM_Person_UID?: string;
}
