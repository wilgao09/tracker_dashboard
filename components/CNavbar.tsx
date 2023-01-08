import style from "../styles/CNavbar.module.css";
import Link from "next/link";

export default function CNavbar() {
    let routes = [
        ["About", "/about"],
        ["nextWebsite", "/nextWebsite"],
    ];

    return (
        <div className={style["navbar"]}>
            <div className={style["logo"]}>
                <Link href={"/"}>Tracker</Link>
            </div>
            <div className={style["navbar-buttons-container"]}>
                {routes.reverse().map((x) => (
                    // <div  className={style["navbar-button-wrapper"]}>
                    <div className={style["navbar-button"]} key={x[0]}>
                        <Link href={x[1]}>{x[0]}</Link>
                    </div>
                    // </div>
                ))}
            </div>
        </div>
    );
}
