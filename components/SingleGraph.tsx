import { VictoryPie } from "victory-pie";
import CTable from "./CTable";

function processVisitsData(visits: Visit[]) {
    let totalTime = 0;
    for (let v of visits) {
        totalTime += v.secondsSpent;
    }
    let map = new Map<string, number>();
    for (let v of visits) {
        let vloc = map.get(v.location);
        if (vloc !== undefined) {
            map.set(v.location, vloc + v.secondsSpent);
        } else {
            map.set(v.location, v.secondsSpent);
        }
    }
    let ans: Object[] = [];
    map.forEach((v, k) => {
        ans.push({
            x: k,
            y: v,
        });
    });

    return ans;
}

export default function SingleGraph(props: SingleGraphProps) {
    return (
        <div style={{ width: "100%" }}>
            <h2>User #{props.uuid}</h2>
            <div>Time Spent Per Page</div>
            <div style={{ height: "500px", width: "50%" }}>
                <VictoryPie
                    data={processVisitsData(props.history)}
                    style={{
                        labels: {
                            fill: "white",
                        },
                    }}
                    labelPlacement={() => "vertical"}
                    labelPosition={() => "centroid"}
                    innerRadius={93}
                    // padAngle={4}
                />
            </div>
            <CTable
                headerColor="rgb(53,53,53)"
                headers={["Location", "Seconds Spent", "Timestamp"]}
                data={props.history.map((x) => [
                    x.location,
                    x.secondsSpent,
                    x.timeEntered,
                ])}
                row1Color="rgb(38,38,38)"
                row2Color="rgb(24,24,24)"
            />
        </div>
    );
}
