
import Dashboard from "./Dashboard";
import UserInfo from "./UserInfo";

/* Does not consume the UserContext, because it's not need here */
export default function Layout() {

    return (
        <>
            <header>
                <h1>My User Application</h1>
                
                {/* Consumer */}
                <UserInfo />
            </header>
            <main>

                {/* Non-Consumer */}
                <Dashboard />
            </main>
        </>
    );
}