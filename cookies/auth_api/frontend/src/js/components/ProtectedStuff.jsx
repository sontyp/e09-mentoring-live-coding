import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../hooks/useAuthStore';


function ProtectedStuff() {
    const [protectedData, setProtectedData] = useState('Not fetched yet');
    const token = useAuthStore(state => state.getToken());
    const logout = useAuthStore(state => state.logout);

    async function clickHandler(evt) {
        // Fetch token from the local- or sessionStorage
        // const token = localStorage.getItem('token');
        // const token = sessionStorage.getItem('token');

        try {
            // Perform axios request onto protected route
            // and define in the options object where the token should go to
            const resp = await axios.get('http://localhost:8080/protected', {
                withCredentials: true, // needed when httpOnly cookie is used
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
            });

            console.log(resp);

            setProtectedData(JSON.stringify(resp.data));

        } catch (error) {
            // Token appears to be expired. Log the user out!
            logout();
            // setProtectedData(error.message);
        }
    }

    return (
        <>
            <button id='protected-button' onClick={clickHandler}>Fetch protected route</button>
            <pre>
                {protectedData}
            </pre>
        </>
    );
}

export default ProtectedStuff;