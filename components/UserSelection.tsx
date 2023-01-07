import { useEffect, useState } from "react";
import { getUsers, getUserData, Ordering } from "./api";
import style from "../styles/UserSelection.module.css";
import SingleGraph from "./SingleGraph";

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
