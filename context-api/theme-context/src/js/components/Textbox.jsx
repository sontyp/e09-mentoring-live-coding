import { useState, useContext } from "react";

import TextboxControls from "./TextboxControls";

// Import the Context here so it can be referenced with useContext
import { ThemeContext } from "./App";

export default function TextBox() {
    // Consume the ThemeContext and extract the value stored in it
    const theme = useContext(ThemeContext);

    const [text, setText] = useState('');
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(30);

    const onChange = (evt) => {
        setText(evt.target.value);
    };


    const onRowsChange = (newRowsValue) => setRows(newRowsValue);
    const onColsChange = (newColsValue) => setCols(newColsValue);

    // A styling-object depending on the ThemeContext value
    const styles = {
        backgroundColor: theme === 'dark' ? 'grey' : 'white',
        color: theme === 'dark' ? 'white' : 'black'
    };

    return (
        <section>
            <textarea
                style={styles}
                cols={cols} rows={rows}
                value={text}
                onChange={onChange}
            ></textarea>

            <TextboxControls
                rows={rows}
                cols={cols}
                rowsCallback={onRowsChange}
                colsCallback={onColsChange}
            />
        </section>
    );
};