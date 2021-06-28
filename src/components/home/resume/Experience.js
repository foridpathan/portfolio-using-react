import React, { Component } from 'react';
import { firebaseExperience } from '../../../firebase';
import { ResumeItem, firebaseLooper, reverseArray } from '../../../ui/misc';

class Experience extends Component {

    state = {
        experiences: []
    }

    componentDidMount() {
        firebaseExperience.once('value').then(snapshot => {
            const services = firebaseLooper(snapshot);
            this.setState({
                experiences: reverseArray(services)
            })
        })
    }

    showExperiences = () => (
        this.state.experiences.map( (experience, i) => (
            <ResumeItem 
                aos="fade-left" 
                delay={i*70}
                key={i}
                title = {experience.title}
                experience = {experience.time_period}
                subtitle = {experience.intitute}
                details = {experience.sumary}
            />
        ) )
    )

    render() {
        return (
            <div>
                <h3 className="resume-title">{this.props.title}</h3>

                { this.showExperiences() }
            </div>
        );
    }
}

export default Experience;