import React, { Component } from 'react';
import FormField from '../../../ui/formFields';
import { validate } from '../../../ui/misc';
import Form from 'react-bootstrap/Form'
import emailjs from 'emailjs-com'

class ContactForm extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name',
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Enter your full name'
                },
                validation: {
                    required: true,
                    email: false
                },
                showlabel: true,
                valid: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                showlabel: true,
                valid: false,
                validationMessage: ''
            },
            subject: {
                element: 'input',
                value: '',
                config: {
                    name: 'subject',
                    label: 'Subject',
                    type: 'text',
                    placeholder: 'Enter your full subject'
                },
                validation: {
                    required: false,
                    email: false
                },
                showlabel: true,
                valid: false,
                validationMessage: ''
            },
            message: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'message',
                    label: 'Message',
                    type: 'textarea',
                    placeholder: 'Enter your full message'
                },
                validation: {
                    required: true,
                    email: false
                },
                showlabel: true,
                valid: false,
                validationMessage: ''
            },
        }
    }

    updateForm(element) {
        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]
        newFormdata[element.id] = newElement;

        this.setState({
            formData: newFormdata
        })

        if (validData[0] === false) {
            this.setState({
                formError: true
            })
        } else {
            this.setState({
                formError: false
            })
        }
    }

    showError = (message) => (
        message
    )

    sendEmail = (e) => {
        e.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.formData) {

            if ((this.state.formData[key].value === '') && (this.state.formData[key].validation.required === true)) {
                const newFormdata = { ...this.state.formData }
                const newElement = { ...this.state.formData[key] }
                let validData = validate(newElement)
                newElement.valid = validData[0];
                newElement.validationMessage = validData[1]
                newFormdata[key] = newElement;

                this.setState({
                    formData: newFormdata
                })

                formIsValid = false;
            } else {
                dataToSubmit[key] = this.state.formData[key].value;
                formIsValid = this.state.formData[key].valid && formIsValid;
            }
        }

        if (formIsValid) {
            emailjs.sendForm('service_35efcgw', 'template_5ggnvj5', e.target, 'user_86X4lWasYB7khE129SIvd')
                .then((result) => {
                    this.setState({
                        formSuccess: true
                    })
                    e.target.reset();
                }, (error) => {
                    console.log(error.text);
                });
        } else {
            this.setState({
                formError: true
            })
        }
    }

    successMessage = () => {
        setTimeout(() => {
            this.setState({
                formSuccess: false
            });
        }, 2000)
        return <div className="sent-message">Your message has been sent. Thank you!</div>
    }

    render() {
        return (
            <div data-aos="fade-left" data-delay="200">
                <Form
                    onSubmit={(e) => this.sendEmail(e)}
                    method="post"
                    className="php-email-form"
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formError ?
                                this.showError(this.state.formData.name.validationMessage)
                                : null
                            }
                        </div>
                        <div className="col-md-6">
                            <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formError ?
                                this.showError(this.state.formData.email.validationMessage)
                                : null
                            }
                        </div>
                    </div>
                    <FormField
                        id={'subject'}
                        formData={this.state.formData.subject}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formError ?
                        this.showError(this.state.formData.subject.validationMessage)
                        : null
                    }
                    <FormField
                        id={'message'}
                        formData={this.state.formData.message}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formError ?
                        this.showError(this.state.formData.message.validationMessage)
                        : null
                    }
                    <div className="my-3">
                        {this.state.formSuccess ?
                            this.successMessage()
                            : null
                        }
                    </div>
                    <div className="text-center">
                        <button type="submit">Send Message</button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default ContactForm;