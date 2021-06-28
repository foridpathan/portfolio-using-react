import React, { Component } from 'react';
import { Tag } from '../../../ui/misc';
import TestimonialSlider from './TestimonialSlider';

class Testimonial extends Component {
    render() {
        return (
            <section id="testimonials" className="testimonials section-bg">
                <div className="container">
                    <Tag
                        title="Testimonials"/>

                    <TestimonialSlider />
                </div>
            </section>
        );
    }
}

export default Testimonial;