import React from 'react';
import Typed from 'react-typed';

const HeroSlider = (props) => {

    return (
        <section 
        id="hero" 
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
            backgroundImage: `url(/assets/img/hero-bg-1.jpg)`
        }}
        >
            <div className="hero-container" data-aos="fade-in">
                <h1>{props.name}</h1>
                {/* <p>I'm <span className="typed" data-typed-items={props.typeItem}></span></p> */}
                <p>I'm  
                    <Typed
                        strings={
                            props.typeItems
                        }
                        typeSpeed={40}
                        loop
                    />
                </p>
            </div>
        </section>
    );
};

export default HeroSlider;