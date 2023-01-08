import { useEffect, useState } from "react";
import { getUsers, getUserData, Ordering } from "./api";
import style from "../styles/UserSelection.module.css";
import SingleGraph from "./SingleGraph";
import CDropdown from "./CDropdown";

function hintOfOrdering(order: Ordering) {
    if (order === Ordering.TIME_ASC || order === Ordering.TIME_DESC) {
        return "Total Time Spent: ";
    } else if (
        order === Ordering.VISITS_ASC ||
        order === Ordering.VISITS_DESC
    ) {
        return "Total Visits: ";
    } else {
        return "Last Activity: ";
    }
}

const displayCodes = [
    { display: "Last Activity", code: Ordering.ACTIVITY_DESC },
    { display: "Total Time Spent (Desc)", code: Ordering.TIME_DESC },
    { display: "Total Time Spent (Asc)", code: Ordering.TIME_ASC },
    { display: "Total Visits Made (Desc)", code: Ordering.VISITS_DESC },
    { display: "Total Visits Made (Asc)", code: Ordering.VISITS_ASC },
];

function displayToCode(d: string) {
    for (let i of displayCodes) {
        if (i.display == d) return i.code;
    }
    return Ordering.ACTIVITY_DESC;
}

export default function UserSelection() {
    let [sortOrder, setSortOrder] = useState<Ordering>(Ordering.ACTIVITY_DESC);
    let [userData, setUserData] = useState<any>([]);
    let [loadedData, setLoadedData] = useState<null | SingleGraphProps>(null);
    useEffect(() => {
        getUsers(sortOrder).then((res) => {
            let rdata = res.data;
            setUserData(rdata);
            console.log(rdata);
        });
    }, [sortOrder]);

    if (loadedData !== null) {
        return (
            <div>
                <button onClick={() => setLoadedData(null)}>Back</button>
                <SingleGraph {...loadedData} />
            </div>
        );
    }

    if (userData.length === 0) {
        return <div> LOADING </div>;
    } else {
        //TODO: upgrade this later
        return (
            <div>
                <CDropdown
                    default={displayCodes[0].display}
                    choices={displayCodes.map((x) => x.display)}
                    onChange={(c) => {
                        setSortOrder(displayToCode(c));
                    }}
                    style={{
                        width: "200px",
                    }}
                />
                {userData.map((x: any) => (
                    <div
                        key={x[1]}
                        className={style["user-card"]}
                        onClick={() =>
                            getUserData(parseInt(x[0])).then((res) => {
                                setLoadedData(res.data);
                            })
                        }
                    >
                        <div>User #{x[0]}</div>
                        <div>{hintOfOrdering(sortOrder) + x[1]}</div>
                    </div>
                ))}
            </div>
        );
    }
}
