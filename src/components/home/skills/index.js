import React, { Component } from 'react';
import { firebaseSkills } from '../../../firebase';
import { Tag, Progress, firebaseLooper, reverseArray } from '../../../ui/misc';

class Skills extends Component {

    state = {
        progress: []
    }

    componentDidMount() {
        firebaseSkills.once('value').then(snapshot => {
            const services = firebaseLooper(snapshot);
            this.setState({
                progress: reverseArray(services)
            })
        })
    }

    showProgress = (start, end) => {
        const newArray = this.state.progress.slice(start, end);
        return newArray.map( (p, i) => (
            <Progress
                key={i}
                title={p.title}
                scor={p.percentage}
            />
        ) )
    }

    render() {
        return (
            <section id="skills" className="skills section-bg">
                <div className="container">

                    <Tag
                        title="Skills">
                        The primary area of my interest is undoubtedly front-end and back-end both. My passion for code had begun in 2012. Now I am react and PHP developer.
                    </Tag>

                    <div className="row skills-content">

                        <div className="col-lg-6" data-aos="fade-up">

                            { this.showProgress(0, this.state.progress.length/2) }

                        </div>

                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">

                            { this.showProgress(this.state.progress.length/2, this.state.progress.length) }

                        </div>

                    </div>

                </div>
            </section>

        );
    }
}

export default Skills;