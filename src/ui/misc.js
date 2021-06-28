import React from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import ProgressBar from 'react-bootstrap/ProgressBar'
import * as Icons from 'react-bootstrap-icons'
import { Alert } from 'react-bootstrap'
import { IconPickerItem } from 'react-fa-icon-picker';
import { Markup } from 'interweave'

export const Tag = (props) => {

    const template = <div className="section-title">
        <h2>{props.title}</h2>
        {props.children}
    </div>

    return template;
};

export const ListItem = (props) => {
    let template = <li></li>

    if (props.linkTo) {
        template = <li>
            <ChevronRight />
            <strong>{props.title}:</strong>
            <span> <a href={props.linkTo}>{props.value}</a> </span>
        </li>
    } else {
        template = <li>
            <ChevronRight />
            <strong>{props.title}:</strong>
            <span>{props.value}</span>
        </li>
    }

    return template;
}

export const Progress = (props) => {
    const template = <div className="progress">
        <span className="skill">{props.title} <i className="val">{props.scor}%</i></span>
        <div className="progress-bar-wrap">
            <ProgressBar now={props.scor} label={`${props.scor}%`} animated />;
        </div>
    </div>
    return template
}

export const ResumeItem = (props) => {
    const template = <div
        className="resume-item"
        data-aos={props.aos ? props.aos : null}
        data-aos-delay={props.delay ? props.delay : null}>
        <h4>{props.title}</h4>
        {props.experience ? <h5>{props.experience}</h5> : null}
        <p><em> {props.subtitle} </em></p>
        <Markup content={props.details} />
    </div>

    return template;
}

export const ServiceUI = (props) => {
    const template = <div
        className="col-lg-4 col-md-6 icon-box"
        data-aos={props.aos ? props.aos : 'fade-up'}
        data-aos-delay={props.delay ? props.delay : '0'}>
        <div className="icon">
            <IconPickerItem icon={props.icon} size={20} /> 
        </div>
        <h4 className="title">{props.title}</h4>
        <p className="description">
            {props.sumary}
        </p>
    </div>

    return template;
}

export const ContactItem = (props) => {
    const { [props.icon]: Icon } = Icons;
    const template = <div>
        <span><Icon></Icon></span>
        <h4>{props.title}:</h4>
        <p>{props.content}</p>
    </div>

    return template;
}

export const validate = (element) => {
    let error = [true, ''];

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        // const message = `${!valid ? :''}`;
        const message = ( !valid ? <Alert
            variant="danger"
        >Must enter vaild email</Alert> : '' );
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = (!valid ? <Alert
            variant="danger"
        >This field is required</Alert> : '');
        error = !valid ? [valid, message] : error;
    }

    return error;
}

export const firebaseLooper = (snapshot) => {
    let data = []
    snapshot.forEach(children => {
        data.push({
            ...children.val(),
            id: children.key
        })
    });
    return data;
}

export const reverseArray = (actualArray) => {
    let reversedArray = [];

    for(let i= actualArray.length-1;i>=0;i--){
        reversedArray.push(actualArray[i])
    }
    return reversedArray;
}