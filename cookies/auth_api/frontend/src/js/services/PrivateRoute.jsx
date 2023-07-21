import useAuthStore from "../hooks/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/* 
    A private route component that makes use of the authStore.
    Checks whether the user is authenticated.
    If yes, the requested route is rendererd.
    If no, navigate to login and store the desired route in the navigation state as a referrer.
*/
function PrivateRoute() {
    const authStore = useAuthStore();
    const location = useLocation();

    return (
        authStore.isAuthenticated() ? <Outlet /> : <Navigate to='/login' replace state={{from: location}} />
    );
}


export default PrivateRoute;