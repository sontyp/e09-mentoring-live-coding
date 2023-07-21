import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Layout() {
    const [cookies, setCookies, removeCookies] = useCookies(['user']);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [fullname, setFullname] = useState('');


    useEffect(() => {
        console.log('cookies changed!');
        console.log(cookies);
    }, [cookies]);

    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname':
                setFirstname(evt.target.value);
                break;
            case 'lastname':
                setLastname(evt.target.value);
                break;
            default:
                break;
        }
    };


    const handleSubmit = (evt) => {
        evt.preventDefault();

        const newFullname = `${firstname} ${lastname}`;

        setFullname(newFullname);

        setCookies('user', newFullname, {maxAge: 60000});
    };

    return (
        <>
            <h2>Layout</h2>

            {
                (fullname.length > 0) && fullname
            }

            <form
                onSubmit={handleSubmit}
            >
                <label>
                    Firstname
                    <input type="text"
                        name="firstname"
                        value={firstname}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Lastname
                    <input type="text"
                        name="lastname"
                        value={lastname}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Set name</button>
            </form>

            <button
                onClick={() => removeCookies('user')}
            >Clear Cookies!</button>
        </>
    );
}

export default Layout;