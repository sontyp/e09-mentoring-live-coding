

function CookieBanner({setIsVisible}) {

    return (
        <section style={{
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid grey',
            display: 'flex',
            gap: '1em',
            justifyContent: 'center'
        }}>
            <p>This page stores some necessary cookies for the functionality.</p>
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    border: '1px solid white',
                    paddingLeft: '0.2em',
                    paddingRight: '0.2em',
                }}
            >OK</button>
        </section>
        
    );
}

export default CookieBanner;