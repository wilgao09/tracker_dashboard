import { useState } from "react";
import style from "../styles/CDropdown.module.css";

interface DropdownProps {
    default: string;
    choices: string[];
    onChange: (choice: string) => void;
    style?: React.CSSProperties;
}

const DropDownArrowIcon = (color: string) => (
    <svg viewBox="0 0 100 100">
        <polygon points="25,50 75,50 50,75" style={{ fill: color }} />
    </svg>
);

export default function CDropdown(props: DropdownProps) {
    let [selection, setSelection] = useState(props.default);

    if (!props.choices.includes(props.default)) {
        return <div> MALFORMED </div>;
    }

    return (
        <div className={style["dropdown"]} style={props.style}>
            <div className={style["selection"]}>
                <div style={{ marginRight: "auto" }}>{selection}</div>

                <div
                    style={{
                        position: "relative",
                        right: "0px",
                        height: "18px",
                        width: "18px",
                    }}
                >
                    {DropDownArrowIcon("grey")}
                </div>
            </div>

            <div className={style["options"]}>
                {props.choices.map((x) => (
                    <div
                        key={x}
                        className={style["option"]}
                        onClick={() => {
                            setSelection(x);
                            props.onChange(x);
                        }}
                    >
                        {x}
                    </div>
                ))}
            </div>
        </div>
    );
}
