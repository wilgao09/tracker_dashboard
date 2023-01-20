import { useEffect, useState } from "react";
import { VictoryChart, VictoryPie } from "victory";
import { getAggregateData } from "./api";
import style from "../styles/AggregateGraphs.module.css";

function processData(rawData: any) {
    let total = 0;
    for (let dp of rawData) {
        dp[1] = parseInt(dp[1]);
        total += dp[1];
    }

    let newData = [];
    for (let dp of rawData) {
        newData.push({
            x: dp[0],
            y: Math.floor((dp[1] / total) * 100),
        });
    }

    return newData;
}

export default function AggregateGraphs() {
    let [hitsData, setHitsData] = useState<null | Array<Object>>(null);
    let [timeData, setTimeData] = useState<null | Array<Object>>(null);
    useEffect(() => {
        if (hitsData === null || timeData === null) {
            getAggregateData().then((res) => {
                let rdata = res.data;
                let t1 = processData(rdata.hitsPerPage);
                let t2 = processData(rdata.timePerPage);
                setHitsData(t1);
                setTimeData(t2);

                console.log(t1, "   ", t2);
            });
        }
    });

    if (hitsData === null || timeData == null) {
        return <div>LOADING</div>;
    } else {
        return (
            <div className={style["chart-container-wrapper"]}>
                <div>Pages by hits</div>
                <div>Pages by retention time</div>
                <div className={style["chart-container"]}>
                    <VictoryPie
                        data={hitsData}
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
                <div className={style["chart-container"]}>
                    <VictoryPie
                        data={timeData}
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
            </div>
        );
    }
}
