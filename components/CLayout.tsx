import { PropsWithChildren } from "react";
import CNavbar from "./CNavbar";
import style from "../styles/CLayout.module.css";

interface CLayoutProps extends PropsWithChildren {}

export default function CLayout(props: CLayoutProps) {
    return (
        <div className={style["entire"]}>
            <CNavbar></CNavbar>
            {props.children}
        </div>
    );
}
