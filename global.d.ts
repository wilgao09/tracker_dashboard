declare enum Ordering {
    ACTIVITY_DESC,
    TIME_DESC,
    TIME_ASC,
    VISITS_DESC,
    VISITS_ASC,
}

interface Visit {
    location: string,
    secondsSpent: number,
    timeEntered: string //this could be a date, but theres no reason for it to be; we will not use this for any calculations
}

interface SingleGraphProps {
    uuid: number;
    history: Visit[];
}