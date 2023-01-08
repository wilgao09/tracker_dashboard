import style from "../styles/CTable.module.css";

export default function CTable(props: TableProps) {
    let colcnt = props.headers.length;

    for (let row of props.data) {
        if (row.length !== colcnt) {
            return <div> MALFORMED </div>;
        }
    }
    return (
        <div style={props.style}>
            <table
                style={{
                    borderSpacing: "0",
                    height: "100%",
                    width: "100%",
                }}
            >
                <tr
                    style={{
                        backgroundColor: props.headerColor,
                    }}
                >
                    {props.headers.map((x, i) => (
                        <th key={"header" + i} className={style["headercell"]}>
                            {x}
                        </th>
                    ))}
                </tr>
                {props.data.map((r, i) => (
                    <tr
                        key={"row" + i}
                        style={{
                            backgroundColor:
                                i % 2 ? props.row1Color : props.row2Color,
                        }}
                    >
                        {r.map((d, i2) => (
                            <td
                                key={"row" + i + "col" + i2}
                                className={style["bodycell"]}
                            >
                                {d}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
