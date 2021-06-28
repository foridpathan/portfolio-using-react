import React, { Component } from 'react';
import { Table, Button, Modal, Spinner } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';

import { validate, firebaseLooper, reverseArray } from '../../../../ui/misc';
import FormField from '../../../../ui/formFields';
import { firebaseEducation, firebaseDB } from '../../../../firebase';
import { Link } from 'react-router-dom';

class EduModal extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_title',
                    type: 'text',
                    placeholder: 'Education title'
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
                    placeholder: 'Education intitute'
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
                    placeholder: 'Education year'
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
                    placeholder: 'Education sumary'
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
                firebaseEducation.push(dataToSubmit).then((r) => {
                    this.successForm('Education added successfuly !')
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
            window.location.reload();
        }, 2000)
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.data.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-container">
                            <form>
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
                            </form>
                            <div>
                                {this.state.formSuccess ?
                                    this.state.formSuccess
                                    : null
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

class Education extends Component {
    state = {
        isLoding: true,
        mShow: false,
        education: [],
        data: {
            title: '',
            id: null,
            formType: ''
        }
    }

    componentDidMount() {
        firebaseEducation.once('value').then(snapshot => {
            const education = firebaseLooper(snapshot);
            this.setState({
                isLoding: false,
                education: reverseArray(education)
            })
        })
    }


    addNewEdu = () => {
        this.setState({
            mShow: true,
            data: {
                title: "Add New Education"
            }
        })
    }

    editEducation = (id) => {
        this.setState({
            mShow: true,
            data: {
                title: "Edit Education",
                id: id,
                formType: 'edit'
            }
        })
    }

    removeEducation(id) {
        firebaseDB.ref(`education/${id}`).remove();
        window.location.reload();
    }

    render() {
        return (
            <div className="per-tab pt-4 pb-4">

                <div className="add-button text-end pb-4">
                    <Button
                        variant="outline-secondary"
                        onClick={() => this.addNewEdu()} >Add Education</Button>
                    <EduModal
                        show={this.state.mShow}
                        data={this.state.data}
                        onHide={() => this.setState({ mShow: false })}
                    />
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Institute</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.education ?
                            this.state.education.map((edu, i) => (
                                <tr key={edu.id} >
                                    <td>{edu.title}</td>
                                    <td>{edu.intitute}</td>
                                    <td>{edu.passing_year}</td>
                                    <td>
                                        <Link to={`/admin/education/edit/${edu.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                        {(this.props.user.role.role === 'admin') ?
                                            <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(edu.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
                                            : null}
                                    </td>
                                </tr>
                            ))
                            : null
                        }

                    </tbody>
                </Table>
                <div className="text-center">
                    {this.state.isLoding ?
                        <Spinner animation="border" variant="info" />
                        : null}
                </div>
            </div>
        );
    }
}

export default Education;