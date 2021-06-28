import React, { useState } from 'react';
import { List, X } from 'react-bootstrap-icons';

import Header from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';

const Layout = (props) => {

    const [mActive, setMactive] = useState(false);

    return (
        <div className={mActive ? 'mobile-nav-active' : ''}>
            <div className="mobile-nav-toggle d-xl-none" onClick={() => { setMactive(!mActive) }}>
                {mActive ? <X /> : <List />}
            </div>
            <Header {...props}/>

            <main id="main">
                {props.children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;