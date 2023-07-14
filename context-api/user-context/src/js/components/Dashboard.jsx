import Todos from "./Todos";
import EditProfile from "./EditProfile";


/* Does not consume the UserContext, because it's not need here */
export default function Dashboard() {

    return (
        <div>
            <h2>Dashboard</h2>

            <section>
                <h3>Todos</h3>

                {/* Non-Consumer */}
                <Todos />

                <h3>Profile</h3>

                {/* Consumer */}
                <EditProfile />
            </section>
        </div>
    );
}