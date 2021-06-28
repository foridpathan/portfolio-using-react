import React, { Component } from 'react';
//Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
// Import Swiper styles
import "swiper/components/pagination/pagination.min.css"
import "swiper/swiper.min.css";

// Local file
import SlideItem from './SlideItem';
import { firebaseTestimonials, firebase } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../ui/misc';


// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

class TestimonialSlider extends Component {

    state = {
        testimonials: []
    }

    componentDidMount() {
        firebaseTestimonials.once('value').then(snapshot => {
            const testimonials = firebaseLooper(snapshot);
            const newTestmonial = reverseArray(testimonials)

            for (let i = 0; i < newTestmonial.length; i++) {
                firebase.storage().ref('testimonial')
                .child(newTestmonial[i].image).getDownloadURL()
                .then(url => {
                    newTestmonial[i].url = url;
                    this.setState({
                        testimonials: newTestmonial
                    })
                }).catch(e => {

                })  
            }
        })
    }

    showSliders = () => (
        this.state.testimonials.map((tm, i) => (
            <SwiperSlide key={i}>
                <SlideItem
                    name={tm.name}
                    position={tm.position}
                    img_url={tm.url}
                    delay={100 * i}
                >
                    {tm.sumary}
                </SlideItem>
            </SwiperSlide>
        ))
    )

    render() {
        return (
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                breakpoints= {{
                    640: {
                      slidesPerView: 1
                    },
                    768: {
                      slidesPerView: 2
                    },
                    1024: {
                      slidesPerView: 3
                    }
                }
                }
                loop={true}
                autoplay={{
                    "delay": 5500,
                    "disableOnInteraction": false
                }}
                pagination={{
                    "clickable": true
                }}
                className="swiper-wrapper"
            >
                {this.showSliders()}
            </Swiper>
        );
    }
}

export default TestimonialSlider;