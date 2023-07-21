import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../hooks/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('location.state:', location.state);
    }, []);
    

    async function submitHandler(evt) {
        evt.preventDefault();

        let body = {
            username: username,
            password: password
        };

        if ( (username.length < 1) || password.length < 1 ) {
            let errorsSet = new Set(errors);

            errorsSet.add('Username and password must not be empty');

            setErrors([...errorsSet]);
            return;
        }

        try {
            let resp = await axios.post('http://localhost:8080/auth/login', body, {
                withCredentials: true
            });

            console.log(resp);
            
            authStore.authenticate(resp.data);
            // localStorage.setItem('token', resp.data.token);
            // sessionStorage.setItem('token', resp.data.token);

            setUsername('');
            setPassword('');
            setErrors([]);

            console.log('Success: token stored in localStorage and sessionStorage');

            // If there is a referrer stored in the navigation state, navigate the client back to it
            if (location.state?.from) navigate(location.state.from);

        } catch (error) {
            console.error(error);
            setErrors([error.response.data.message]);
        }
    }

    const loginSuccess = <p style={{color: 'green'}}>Login successful!</p>;
    const errorBox = errors.map((error, idx) => {
        return <li key={idx}>{error}</li>;
    });

    return (
        <>
            {authStore.isAuthenticated() && loginSuccess}

            {
                authStore.isAuthenticated() ? 
                    (<button onClick={evt => authStore.logout()} style={{border: '1px solid grey', backgroundColor: 'white', padding: '0.5em'}}>Logout</button>) 
                : 
                    (
                        <form id='login-form' onSubmit={submitHandler}>
                            {(errors.length > 0) && (<ul style={{backgroundColor: 'rgba(255,0,0,0.5)', border: '1px solid red'}}>{errorBox}</ul>)}


                            <label>Username
                                <input type="text" value={username} onChange={evt => setUsername(evt.target.value)}/>
                            </label>
                            <label>Password
                                <input type="password" value={password} onChange={evt => setPassword(evt.target.value)}/>
                            </label>
                            <button type='submit'>Submit</button>
                        </form>
                    )
            }
        </>
    );
}


export default LoginForm;