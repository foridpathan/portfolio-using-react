import React, { Component } from 'react';
import { Tag } from '../../../ui/misc';
import BasicInfo from './BasicInfo';
import Education from './Education';
import Experience from './Experience';
import Training from './Training';

class Resume extends Component {
    render() {
        return (
            <section id="resume" className="resume">
                <div className="container">
                    <Tag
                        title="Resume"
                    ></Tag>

                    <div className="row">
                        <div className="col-lg-6" data-aos="fade-up">
                            <BasicInfo
                                title="Sumary"
                            />
                            <Education
                                title="Education"
                            />
                            <Training
                                title="Training"
                            />
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <Experience
                                title="Professional Experience"
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Resume;