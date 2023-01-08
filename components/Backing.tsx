import { PropsWithChildren } from "react";
import style from "../styles/Backing.module.css";

interface BackingProps extends PropsWithChildren {
    style?: React.CSSProperties;
}

export default function Backing(props: BackingProps) {
    return (
        <main className={style["backing"]} style={props.style}>
            {props.children}
        </main>
    );
}
