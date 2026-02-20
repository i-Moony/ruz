export function setGroup(groupId:string): void {
    window.localStorage.setItem("groupId", groupId);
}

export function setExcludedDisciplines(excludedDisciplines:string[]): void {
    const stringifiedVersion = excludedDisciplines.join(";");

    window.localStorage.setItem("excludedDisciplines", stringifiedVersion);
}

export function getGroup(): string | null {
    return window.localStorage.getItem("groupId");
}

export function getExcludedDisciplines(): string[] | null {
    const excludedDisciplines = window.localStorage.getItem("excludedDisciplines");

    if (!excludedDisciplines)
        return null;

    return excludedDisciplines.split(";");
};
