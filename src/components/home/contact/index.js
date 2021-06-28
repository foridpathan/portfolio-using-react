import React, { Component } from 'react';
import { firebaseProfile } from '../../../firebase';
import { ContactItem, Tag } from '../../../ui/misc';
import ContactForm from './ContactForm';

class Contact extends Component {

    state = {
        email: '',
        mobile: '',
        address: ''
    }

    componentDidMount() {
        firebaseProfile.once('value')
            .then((snapshot) => {
                const profile = snapshot.val();
                
                this.setState({
                    email: profile.email,
                    mobile: profile.mobile,
                    address: profile.address
                })
            })
    }

    render() {
        return (
            <section id="contact" className="contact">
                <div className="container">
                    <Tag
                        title="Contact">
                    </Tag>

                    <div className="row" data-aos="fade-in">

                        <div className="col-lg-5 d-flex align-items-stretch" data-aos="fade-right" >
                            <div className="info">
                                <ContactItem
                                    title="Location"
                                    content={this.state.address}
                                    icon="GeoAlt"
                                />
                                <ContactItem
                                    title="Email"
                                    content={this.state.email}
                                    icon="Envelope"
                                />
                                <ContactItem
                                    title="Call"
                                    content={this.state.mobile}
                                    icon="Phone"
                                />

                                <iframe
                                    title="my location"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14604.185576164686!2d90.3590495!3d23.7813622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcaa002a8d981ea5d!2sPlenary%20Soft!5e0!3m2!1sen!2sbd!4v1624467571633!5m2!1sen!2sbd"
                                    frameBorder="0"
                                    style={{
                                        border: 0, width: '100%', height: '290px'
                                    }}
                                    allowFullScreen
                                    loading="lazy"></iframe>

                            </div>

                        </div>

                        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </section>
        );
    }
};

export default Contact;