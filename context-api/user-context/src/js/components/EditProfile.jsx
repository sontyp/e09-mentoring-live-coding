import { useState, useContext } from "react";
import { UserContext } from "./App";

export default function EditProfile() {
    // Extract the value and its setter from the UserContext by consuming it
    const { username, setUsername } = useContext(UserContext);
    // const user = useContext(UserContext);

    // State for the edit form
    // preloaded with the value from the UserContext
    const [newUsername, setNewUsername] = useState(username);
    
    // Input handler for the edit form
    const handleChange = evt => {
        setNewUsername(evt.target.value);
    };

    /* 
        Submit handler for the edit form
        which is submitting the new value from the input
        to the setter function consumed from the Usercontext
    */
    const handleSubmit = evt => {
        evt.preventDefault();

        // Call setter function from UserContext
        setUsername(newUsername);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label>
                Change username
                <input 
                    type="text" 
                    value={newUsername}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}