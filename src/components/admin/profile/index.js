import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../ui/misc';
import FormField from '../../../ui/formFields';
import { firebaseDB, firebaseProfile, firebase } from '../../../firebase';
import { Link } from 'react-router-dom';
import Fileuploader from '../../../ui/fileUploader';

class Profile extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formType: '',
        defaultProfileImg: '',
        defaultFeaturedImg: '',
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
            address: {
                element: 'input',
                value: '',
                config: {
                    name: 'address',
                    type: 'text',
                    placeholder: 'Enter your address',
                    label: 'Address'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            mobile: {
                element: 'input',
                value: '',
                config: {
                    name: 'mobile',
                    type: 'text',
                    placeholder: 'Enter your Mobile number',
                    label: 'Mobile number'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Enter your email',
                    label: 'Contact email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            higherDegree: {
                element: 'input',
                value: '',
                config: {
                    name: 'higherDegree',
                    type: 'text',
                    placeholder: 'Enter your degree',
                    label: 'Degree'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            profilePic: {
                element: 'profilePic',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            featuredImage: {
                element: 'featuredImage',
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
            basic_details: {
                element: 'editor',
                value: '',
                config: {
                    name: 'basic_details',
                    placeholder: 'Say your self',
                    label: 'Basic Details'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            professional_details: {
                element: 'editor',
                value: '',
                config: {
                    name: 'professional_details',
                    placeholder: 'Say your self',
                    label: 'Professional Details'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            birthday: {
                element: 'input',
                value: '',
                config: {
                    name: 'birthday',
                    type: 'date',
                    placeholder: 'Enter your birthday',
                    label: 'Birthday'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            married: {
                element: 'input',
                value: '',
                config: {
                    name: 'married',
                    type: 'text',
                    placeholder: 'Enter your Marital Status',
                    label: 'Marital Status'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            religion: {
                element: 'input',
                value: '',
                config: {
                    name: 'religion',
                    type: 'text',
                    placeholder: 'Enter your religion',
                    label: 'Religion'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            website: {
                element: 'input',
                value: '',
                config: {
                    name: 'website',
                    type: 'text',
                    placeholder: 'Enter your website',
                    label: 'Website'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            freelancer: {
                element: 'input',
                value: '',
                config: {
                    name: 'freelancer',
                    type: 'text',
                    placeholder: 'Enter your freelancer',
                    label: 'freelancer'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
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
            formError: false,
            formData: newFormdata
        })
    }

    updateEditor(element) {
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

    updateFields(experience, id) {
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
            formData: newFormdata
        })
    }

    componentDidMount() {
        const expId = 'prinserted';

        firebaseDB.ref(`profile/${expId}`).once('value')
            .then((snapshot) => {
                const exp = snapshot.val();
                firebase.storage().ref('profile')
                    .child(exp.profilePic).getDownloadURL()
                    .then(url => {
                        this.setState({
                            defaultProfileImg: url
                        })
                    })
                firebase.storage().ref('profile')
                    .child(exp.featuredImage).getDownloadURL()
                    .then(url => {
                        this.setState({
                            defaultFeaturedImg: url
                        })
                    })

                this.updateFields(exp, expId)

                // this.updateFields(exp, 'Edit Testimonial', expId)
            }).catch(e => {
                console.log(e)
            })
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
                firebaseProfile.update(dataToSubmit).then(() => {
                    this.successForm('Added successfuly');
                }).catch((e) => {
                    this.setState({ formError: true })
                })
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

    storeProfileFilename = (filename) => {
        this.updateImage({ id: 'profilePic', event: filename })
    }
    storeFeaturedFilename = (filename) => {
        this.updateImage({ id: 'featuredImage', event: filename })
    }

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
            this.props.history.push('/admin/profile');
        }, 2000)
    }

    render() {
        return (
            <section className="inner">
                <div className="container-fluid">
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <Card border="primary">
                            <Card.Header><h3>Basic Information</h3></Card.Header>
                            <Card.Body>
                                <div className="form-container">

                                    <div className="row row-cols-1 row-cols-md-2">
                                        <div className="col">
                                            <Fileuploader
                                                dir="profile"
                                                tag={"Profile image"}
                                                defaultImg={this.state.defaultProfileImg}
                                                defaultImgName={this.state.formData.profilePic.value}
                                                resetImage={() => this.resetImage()}
                                                filename={(filename) => this.storeProfileFilename(filename)}
                                            />
                                        </div>
                                        <div className="col">
                                            <Fileuploader
                                                dir="profile"
                                                tag={"Featured image"}
                                                defaultImg={this.state.defaultFeaturedImg}
                                                defaultImgName={this.state.formData.featuredImage.value}
                                                resetImage={() => this.resetImage()}
                                                filename={(filename) => this.storeFeaturedFilename(filename)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3 row-cols-1 row-cols-md-2">
                                        <div className="col">
                                            <FormField
                                                id={'name'}
                                                formData={this.state.formData.name}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.name.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'position'}
                                                formData={this.state.formData.position}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.position.validationMessage
                                                : null
                                            }
                                        </div>
                                    </div>

                                    <div className="row mt-3 row-cols-1 row-cols-md-3">
                                        <div className="col">
                                            <FormField
                                                id={'address'}
                                                formData={this.state.formData.address}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.address.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'mobile'}
                                                formData={this.state.formData.mobile}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.mobile.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'email'}
                                                formData={this.state.formData.email}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.email.validationMessage
                                                : null
                                            }
                                        </div>
                                    </div>

                                    <div className="row mt-3 row-cols-1 row-cols-md-3">
                                        <div className="col">
                                            <FormField
                                                id={'basic_details'}
                                                formData={this.state.formData.basic_details}
                                                change={(event) => this.updateEditor(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.basic_details.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'professional_details'}
                                                formData={this.state.formData.professional_details}
                                                change={(event) => this.updateEditor(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.professional_details.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'sumary'}
                                                formData={this.state.formData.sumary}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.sumary.validationMessage
                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card border="primary mt-4">
                            <Card.Header><h3>Additional Information</h3></Card.Header>
                            <Card.Body>
                                <div className="form-container">
                                    <div className="row row-cols-1 row-cols-md-3">
                                        <div className="col">
                                            <FormField
                                                id={'higherDegree'}
                                                formData={this.state.formData.higherDegree}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.higherDegree.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'birthday'}
                                                formData={this.state.formData.birthday}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.birthday.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'married'}
                                                formData={this.state.formData.married}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.married.validationMessage
                                                : null
                                            }
                                        </div>
                                    </div>

                                    <div className="row mt-3 row-cols-1 row-cols-md-3">
                                        <div className="col">
                                            <FormField
                                                id={'religion'}
                                                formData={this.state.formData.religion}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.religion.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'website'}
                                                formData={this.state.formData.website}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.website.validationMessage
                                                : null
                                            }
                                        </div>
                                        <div className="col">
                                            <FormField
                                                id={'freelancer'}
                                                formData={this.state.formData.freelancer}
                                                change={(event) => this.updateForm(event)}
                                            />
                                            {this.state.formError ?
                                                this.state.formData.freelancer.validationMessage
                                                : null
                                            }
                                        </div>
                                    </div>

                                    <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                                    <Link to="/admin/testimonials" className="ms-3"><Button variant="info" >Back</Button></Link>

                                    <div>
                                        {this.state.formSuccess ?
                                            this.state.formSuccess
                                            : null
                                        }
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </form>
                </div>
            </section>
        );
    }
}

export default Profile;