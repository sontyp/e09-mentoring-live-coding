import { useState } from 'react';
import axios from 'axios';


function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [city, setCity] = useState('');

    function submitHandler(evt) {
        evt.preventDefault();
        
        // Create object for the request body
        let registrationData = {
          username: username,
          password: password,
          fullname: fullname,
          city: city
        };
    
        // Send request to the /register endpoint of the API
        axios.post('http://localhost:8080/auth/register', registrationData)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
    }

    return (
        <form id='register-form' onSubmit={submitHandler}>
          <label>Username
            <input type="text" value={username} onChange={evt => setUsername(evt.target.value)}/>
          </label>
          <label>Password
            <input type="password" value={password} onChange={evt => setPassword(evt.target.value)}/>
          </label>
          <label>Full Name
            <input type="text" value={fullname} onChange={evt => setFullname(evt.target.value)}/>
          </label>
          <label>City (optional)
            <input type="text" value={city} onChange={evt => setCity(evt.target.value)}/>
          </label>
          <button type='submit'>Submit</button>
        </form>
    );
}

export default RegisterForm;