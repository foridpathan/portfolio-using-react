import React, {Component} from 'react';
import CountUp from 'react-countup';
import { IconPickerItem } from 'react-fa-icon-picker';

class FactCounder extends Component {

    render() {
        return (
            <div 
            className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" 
            data-aos="fade-up"
            data-aos-delay={this.props.aosDelay}
            >
                <div className="count-box">
                <IconPickerItem icon={this.props.icon} size={20} color="#000" />
                    <CountUp
                        start={0}
                        end={parseInt(this.props.end)}
                        duration="5.7"
                        className="purecounter"/>
                    <p><strong>{this.props.name}</strong></p>
                </div>
            </div>
        );
    }
};

export default FactCounder;