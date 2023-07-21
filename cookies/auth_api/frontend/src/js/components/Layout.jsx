import {Link, Outlet} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import CookieBanner from './CookieBanner';
import { useEffect, useState } from 'react';

function Layout() {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const authStore = useAuthStore();

    /* 
        Check in the session- or localStorage, whether the cookie banner
        has been dismissed yet and decide to hide it respectively.
    */
    useEffect(() => {
        // const bannerVisible = localStorage.getItem('isBannerVisible');
        const bannerVisible = sessionStorage.getItem('isBannerVisible');

        if (bannerVisible !== null) {
            // Cast the boolean string value to an actual boolean
            const castedValue = (bannerVisible === 'true') ? true : false;
            setIsBannerVisible(castedValue);
        }
    }, []);

    /* 
        Persistently store whether the cookie banner has been dismissed or not
    */
    useEffect(() => {
        if (isBannerVisible === false) {
            /* 
                While the localStorage is going to keep this information undefinitely long,
                the sessionStorage gets deleted when the session ends (e.g. tab closed).
                Page reloads don't effect the sessionStorage though.
            */
            // localStorage.setItem('isBannerVisible', isBannerVisible);
            sessionStorage.setItem('isBannerVisible', isBannerVisible);
        }
    }, [isBannerVisible]);

    return (
        <>
            <h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome aboard, {authStore.isAuthenticated() ? authStore.user.fullname : 'Anonymous'}!</h2>
            <nav>
                <ul style={{
                    display: 'flex',
                    gap: '1em',
                    justifyContent: 'center'
                }}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/protected'>Protected</Link></li>
                </ul>
            </nav>

            <Outlet />

            { isBannerVisible && <CookieBanner setIsVisible={setIsBannerVisible} /> }
            
        </>
    );
}

export default Layout;