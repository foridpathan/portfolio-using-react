import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './404.css'

const NotFound = () => {
    return (
        <section className="notfound">
            <div className='number'>404</div>
            <div className='text'>
                <p>span Ooops...</p>
                <p>page not found</p>
                <Link to="/">
                    <Button variant="outline-danger" >GO TO HOME</Button>
                </Link>
            </div>
        </section>
    );
};

export default NotFound;