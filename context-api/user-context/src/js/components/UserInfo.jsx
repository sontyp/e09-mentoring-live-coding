import { useContext } from "react";
import { UserContext } from "./App";

/* Consumes the UserContext because it needs the username value to display it */
export default function UserInfo() {
    // Consume the UserContext and extract the username from it
    const { username } = useContext(UserContext);

    return (
        /* Show the extracted username from the consumed context */
        <span>Hello {username}!</span>
    );
}