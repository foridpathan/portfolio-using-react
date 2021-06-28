import React from 'react';
import * as Icon from 'react-bootstrap-icons';

const SocialProfile = (props) => {

    const showIcon = (icon) => {
        if(icon === 'twitter') {
            return <Icon.Twitter/>
        }
        if(icon === 'github') {
            return <Icon.Github/>
        }
        if(icon === 'facebook') {
            return <Icon.Facebook/>
        }
        if(icon === 'linkedin') {
            return <Icon.Linkedin/>
        }
        if(icon === 'youtube') {
            return <Icon.Youtube/>
        }
        if(icon === 'instagram') {
            return <Icon.Instagram/>
        }
        if(icon === 'skype') {
            return <Icon.Skype/>
        }
    }

    return (
        <a href={props.linkTo} target="_blank" rel="noreferrer">
            { showIcon(props.icon) }
        </a>
    );
};

export default SocialProfile;