import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-bootstrap-icons'

const SocialMediaSignin = () => {
    return (
        <div className="social-container">
            <Link to="#" className="social">
                <Icons.Facebook/>
            </Link>
            <Link to="#" className="social">
                <Icons.Google/>
            </Link>
            <Link to="#" className="social">
                <Icons.Linkedin/>
            </Link>
        </div>
    );
};

export default SocialMediaSignin;