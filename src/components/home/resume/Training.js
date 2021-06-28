import React, { Component } from 'react';
import { firebaseTraining } from '../../../firebase';
import { ResumeItem, firebaseLooper, reverseArray } from '../../../ui/misc';

class Training extends Component {

    state = {
        trainings:[]
    }

    componentDidMount() {
        firebaseTraining.once('value').then(snapshot => {
            const services = firebaseLooper(snapshot);
            this.setState({
                trainings: reverseArray(services)
            })
        })
    }

    showTrining = () => (
        this.state.trainings.map( (training, i) => (
            <ResumeItem
                key = {i}
                title = {training.title}
                experience = {training.passing_year}
                subtitle = {training.intitute}
                details = {training.sumary}
            />
        ) )
    )

    render() {
        return (
            <div>
                <h3 className="resume-title"> { this.props.title } </h3>

                { this.showTrining() }
            </div>
        );
    }
}

export default Training;