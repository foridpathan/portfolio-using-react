import React from "react";
import { useLightbox } from "simple-react-lightbox";
import { Plus } from 'react-bootstrap-icons'

const Button = (props) => {
    const { openLightbox } = useLightbox();

    return (
        <button
            className="SRL_CTA-OpenLightbox"
            onClick={() => openLightbox(props.imageToOpen)}
        >
            <Plus />
        </button>
    );
};

export default Button;
