import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../../ui/misc';
import FormField from '../../../../ui/formFields';
import { firebaseDB, firebaseExperience } from '../../../../firebase';
import { Link } from 'react-router-dom';

class AddEditExperience extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formType: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title',
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
            intitute: {
                element: 'input',
                value: '',
                config: {
                    name: 'intitute',
                    type: 'text',
                    placeholder: 'Intitute name',
                    label: 'Intitute name'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            time_period: {
                element: 'input',
                value: '',
                config: {
                    name: 'time_period',
                    type: 'text',
                    placeholder: 'Time Period',
                    label: 'Time Period'
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
                element: 'editor',
                value: '',
                config: {
                    name: 'sumary',
                    type: 'textarea',
                    placeholder: 'Achievement',
                    label: 'Achievement'
                },
                validation: {
                    required: false,
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

    updateFields(experience, type, id) {
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
            formData: newFormdata
        })
    }

    componentDidMount() {
        const expId = this.props.match.params.id;


        if (!expId) {
            this.updateFields(false, 'Add Experiece', expId)
        } else {
            firebaseDB.ref(`experience/${expId}`).once('value')
                .then((snapshot) => {
                    const exp = snapshot.val();

                    this.updateFields(exp, 'Edit Experiece', expId)
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
                if (this.state.formType === 'Edit Experiece') {
                    firebaseDB.ref(`experience/${this.state.id}`)
                        .update(dataToSubmit).then(() => {
                            this.successForm('Updated correctly');
                        }).catch((e) => {
                            this.setState({ formError: true })
                        })
                } else {
                    firebaseExperience.push(dataToSubmit).then(() => {
                        this.props.history.push('/admin/personality');
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

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
            this.props.history.push('/admin/personality');
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
                                    <FormField
                                        id={'title'}
                                        formData={this.state.formData.title}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.title.validationMessage
                                        : null
                                    }
                                    <FormField
                                        id={'intitute'}
                                        formData={this.state.formData.intitute}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.intitute.validationMessage
                                        : null
                                    }
                                    <FormField
                                        id={'time_period'}
                                        formData={this.state.formData.time_period}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.passing_year.validationMessage
                                        : null
                                    }
                                    <FormField
                                        id={'sumary'}
                                        formData={this.state.formData.sumary}
                                        change={(event) => this.updateEditor(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.sumary.validationMessage
                                        : null
                                    }
                                    <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                                    <Link to="/admin/personality" className="ms-3"><Button variant="info" >Back</Button></Link>
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

export default AddEditExperience;