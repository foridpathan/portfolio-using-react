import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../ui/misc';
import FormField from '../../../ui/formFields';
import { firebaseDB, firebaseTestimonials, firebase } from '../../../firebase';
import { Link } from 'react-router-dom';
import Fileuploader from '../../../ui/fileUploader';

class AddEditTestimonial extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formType: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Name',
                    label: 'Name'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            position: {
                element: 'input',
                value: '',
                config: {
                    name: 'position',
                    type: 'text',
                    placeholder: 'Position',
                    label: 'Position'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            sumary: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'sumary',
                    type: 'textarea',
                    placeholder: 'What client say\'s',
                    label: 'Sumary'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
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
            formError: false,
            formData: newFormdata
        })
    }
    updateImage(element) {
        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormdata
        })
    }

    updateFields(experience, type, id, defaultImg = '') {
        const newFormdata = {
            ...this.state.formData
        }

        for (let key in newFormdata) {
            if (experience) {
                newFormdata[key].value = experience[key];
                newFormdata[key].valid = true;
            }
        }

        this.setState({
            id,
            formType: type,
            defaultImg,
            formData: newFormdata
        })
    }

    componentDidMount() {
        const expId = this.props.match.params.id;

        if (!expId) {
            this.updateFields(false, 'Add Testimonial', expId)
        } else {
            firebaseDB.ref(`testimonials/${expId}`).once('value')
                .then((snapshot) => {
                    const exp = snapshot.val();

                    firebase.storage().ref('testimonial')
                        .child(exp.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(exp, 'Edit Testimonial', expId, url)
                        }).catch(e => {
                            this.updateFields({
                                ...exp,
                                image: ''
                            }, 'Edit Testimonial', expId, '')
                        })
                    // this.updateFields(exp, 'Edit Testimonial', expId)
                })
        }
    }

    submitForm(event) {
        event.preventDefault();
        if (this.props.user.role.role !== 'admin') {
            window.alert("Sorry you are not able to update")
        } else {
            let dataToSubmit = {};
            let formIsValid = true;

            for (let key in this.state.formData) {
                dataToSubmit[key] = this.state.formData[key].value;
                formIsValid = this.state.formData[key].valid && formIsValid;
            }


            if (formIsValid) {
                if (this.state.formType === 'Edit Testimonial') {
                    firebaseDB.ref(`testimonials/${this.state.id}`)
                        .update(dataToSubmit).then(() => {
                            this.successForm('Updated correctly');
                        }).catch((e) => {
                            this.setState({ formError: true })
                        })
                } else {
                    firebaseTestimonials.push(dataToSubmit).then(() => {
                        this.props.history.push('/admin/testimonials');
                    }).catch((e) => {
                        this.setState({ formError: true })
                    })
                }
            } else {
                this.setState({
                    formError: true
                })
            }
        }
    }

    resetImage = () => {
        const newFormdata = { ...this.state.formData }
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;

        this.setState({
            defaultImg: '',
            formData: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateImage({ id: 'image', event: filename })
    }

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
            this.props.history.push('/admin/testimonials');
        }, 2000)
    }

    render() {
        return (
            <section className="inner">
                <div className="container-fluid">
                    <Card border="primary" style={{ maxWidth: '850px' }}>
                        <Card.Header><h3>{this.state.formType}</h3></Card.Header>
                        <Card.Body>
                            <div className="form-container">
                                <form onSubmit={(event) => this.submitForm(event)}>
                                    <Fileuploader
                                        dir="testimonial"
                                        tag={"Client image"}
                                        defaultImg={this.state.defaultImg}
                                        defaultImgName={this.state.formData.image.value}
                                        resetImage={() => this.resetImage()}
                                        filename={(filename) => this.storeFilename(filename)}
                                    />
                                    <FormField
                                        id={'name'}
                                        formData={this.state.formData.name}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.name.validationMessage
                                        : null
                                    }
                                    <FormField
                                        id={'position'}
                                        formData={this.state.formData.position}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.position.validationMessage
                                        : null
                                    }
                                    <FormField
                                        id={'sumary'}
                                        formData={this.state.formData.sumary}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.sumary.validationMessage
                                        : null
                                    }

                                    <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                                    <Link to="/admin/testimonials" className="ms-3"><Button variant="info" >Back</Button></Link>
                                </form>
                                <div>
                                    {this.state.formSuccess ?
                                        this.state.formSuccess
                                        : null
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        );
    }
}

export default AddEditTestimonial;