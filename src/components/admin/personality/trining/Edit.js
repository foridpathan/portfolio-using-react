import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../../ui/misc';
import FormField from '../../../../ui/formFields';
import { firebaseDB } from '../../../../firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_title',
                    type: 'text',
                    placeholder: 'Training title'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            intitute: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_intitute',
                    type: 'text',
                    placeholder: 'Training intitute'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            passing_year: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_passing_year',
                    type: 'text',
                    placeholder: 'Training year'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            sumary: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'edu_sumary',
                    type: 'textarea',
                    placeholder: 'Training sumary'
                },
                validation: {
                    required: false,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
        }
    }

    componentDidMount() {
        const eduId = this.props.match.params.id
        if ((eduId)) {
            firebaseDB.ref(`training/${eduId}`).once('value')
                .then(snapshot => {
                    const newFormData = { ...this.state.formData };

                    const eduById = snapshot.val();
                    for (let key in eduById) {
                        newFormData[key].value = eduById[key]
                        newFormData[key].valid = true
                    }
                    this.setState({
                        formData: newFormData,
                        id: eduId
                    })
                }).catch(e => {
                    console.log(e)
                })
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

    submitForm(event) {
        event.preventDefault();
        if (this.props.user.role.role !== 'admin') {
            window.alert("Sorry you are not able to update")
        } else {
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
                    formIsValid = true;
                }
            }

            if (formIsValid) {
                firebaseDB.ref(`training/${this.state.id}`)
                    .update(dataToSubmit).then(() => {
                        this.props.history.push('/admin/personality');
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

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }


    render() {
        return (
            <section className="inner">
                <div className="container-fluid">
                    <Card border="primary">
                        <Card.Header><h3>Edit Training</h3></Card.Header>
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
                                        id={'passing_year'}
                                        formData={this.state.formData.passing_year}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.passing_year.validationMessage
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

export default Edit;