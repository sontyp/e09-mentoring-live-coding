import { useContext } from "react";

// Import the Context here so it can be referenced with useContext
import { ThemeContext } from "./App";

export default function TextboxControls({ rows, cols, rowsCallback, colsCallback }) {
    // Consume the ThemeContext and extract the value stored in it
    const theme = useContext(ThemeContext);

    const onRowsChange = (evt) => {
        rowsCallback(Number(evt.target.value));

    };

    const onColsChange = (evt) => {
        colsCallback(Number(evt.target.value));
    };

    // A styling-object depending on the ThemeContext value
    const styles = {
        backgroundColor: theme === 'dark' ? 'grey' : 'white',
        color: theme === 'dark' ? 'white' : 'black'
    };

    return (
        <aside>
            <label>
                Rows
                <input 
                    type="number"
                    value={rows}
                    onChange={onRowsChange}
                    style={styles}
                />
            </label>

            <label>
                Columns
                <input 
                    type="number"
                    value={cols}
                    onChange={onColsChange}
                    style={styles}
                />
            </label>
        </aside>
    );
}