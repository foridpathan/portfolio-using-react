import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'

const SlideItem = (props) => {
    return (
        <div className="testimonial-item" data-aos="fade-up" data-aos-delay={props.delay}>
            <p>
                <FontAwesomeIcon icon={faQuoteLeft} />
                {props.children}
                <FontAwesomeIcon icon={faQuoteRight} />
            </p>
            {props.img_url ?
                <img src={props.img_url} className="testimonial-img" alt="" />
                : null}
            {props.name ?
                <h3>{props.name}</h3>
                : null}
            {props.position ?
                <h4>{props.position}</h4>
                : null}
        </div>
    );
};

export default SlideItem;