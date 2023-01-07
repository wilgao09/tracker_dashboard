import { PropsWithChildren, useState } from "react";
import AggregateGraphs from "../components/AggregateGraphs";
import CLayout from "../components/CLayout";
import UserSelection from "../components/UserSelection";
import style from "../styles/nextWebsite.module.css";

interface nextWebsiteProps extends PropsWithChildren {}

export default function NextWebsite(props: nextWebsiteProps) {
    let [currentTab, setCurrentTab] = useState("agg");
    //TODO: responsive design
    return (
        <CLayout>
            <div className={style["container"]}>
                <div className={style["sidetabs"]}>
                    <div
                        className={style["sidetab-button"]}
                        onClick={() => setCurrentTab("agg")}
                    >
                        Aggregate
                    </div>
                    <div
                        className={style["sidetab-button"]}
                        onClick={() => setCurrentTab("single")}
                    >
                        Singular
                    </div>
                </div>
                <main className={style["main-content"]}>
                    {currentTab === "agg" ? (
                        <AggregateGraphs />
                    ) : (
                        <UserSelection />
                    )}
                </main>
            </div>
        </CLayout>
    );
}
