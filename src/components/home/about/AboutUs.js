import React from 'react';
import { ListItem } from '../../../ui/misc';
import { Markup } from 'interweave'

const AboutUs = (props) => {

    const showPersonalInfo = () => (
        <div>
            <div className="row pb-5 pt-4">
                <div className="col-lg-6">
                    <ul>
                        <ListItem
                            title="Birthday"
                            value={props.profile.birthday}
                            linkTo=""
                        />
                        <ListItem
                            title="Marital Status"
                            value={props.profile.married}
                            linkTo=""
                        />
                        <ListItem
                            title="Website"
                            value={props.profile.website}
                            linkTo={`https://${props.profile.website}`}
                        />
                        <ListItem
                            title="Phone"
                            value={props.profile.mobile}
                            linkTo={`tal:${props.profile.mobile}`}
                        />
                        <ListItem
                            title="City"
                            value={props.profile.address}
                            linkTo=""
                        />
                    </ul>
                </div>
                <div className="col-lg-6">
                    <ul>
                        <ListItem
                            title="Age"
                            value={props.profile.dob}
                            linkTo=""
                        />
                        <ListItem
                            title="Degree"
                            value={props.profile.higherDegree}
                            linkTo=""
                        />
                        <ListItem
                            title="Religion"
                            value={props.profile.religion}
                            linkTo=""
                        />
                        <ListItem
                            title="Email"
                            value={props.profile.email}
                            linkTo={`mailto:${props.profile.email}`}
                        />
                        <ListItem
                            title="Freelance"
                            value={props.profile.freelancer}
                            linkTo=""
                        />
                    </ul>
                </div>
            </div>
            <div>
                <Markup content={props.professional_details} />
            </div>
        </div>
    )


    return (
        <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
            <h3>{props.positon}</h3>

            {showPersonalInfo()}


        </div>
    );
};

export default AboutUs;