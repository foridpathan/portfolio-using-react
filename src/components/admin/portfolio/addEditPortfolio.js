import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../ui/misc';
import FormField from '../../../ui/formFields';
import { firebaseDB, firebasePortfolios, firebase } from '../../../firebase';
import { Link } from 'react-router-dom';
import Fileuploader from '../../../ui/fileUploader';

class AddEditPortfolio extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formType: '',
        defaultImg: '',
        defaultThumb: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title',
                    type: 'text',
                    placeholder: 'Enter project title',
                    label: 'Title'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            client: {
                element: 'input',
                value: '',
                config: {
                    name: 'client',
                    type: 'text',
                    placeholder: 'Enter client name',
                    label: 'Client'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            category: {
                element: 'select',
                value: '',
                config: {
                    label: 'Category',
                    name: 'select_category',
                    type: 'select',
                    options: [
                        { key: 'reactjs', value: 'React Js' },
                        { key: 'php', value: 'PHP (Condeigniter & Laravel)' },
                        { key: 'wordpress', value: 'WordPress' },
                        { key: 'html_css', value: 'HTML & CSS' },
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            url: {
                element: 'input',
                value: '',
                config: {
                    name: 'url',
                    type: 'text',
                    placeholder: 'Enter project url',
                    label: 'Project URL'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            completeDate: {
                element: 'input',
                value: '',
                config: {
                    name: 'project_date',
                    type: 'date',
                    label: 'Complete Date'
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
            thumb: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
            this.updateFields(false, 'Add Portfolio', expId)
        } else {
            firebaseDB.ref(`portfolios/${expId}`).once('value')
                .then((snapshot) => {
                    const exp = snapshot.val();

                    firebase.storage().ref('portfolios')
                        .child(exp.image).getDownloadURL()
                        .then(url => {
                            this.setState({
                                defaultImg: url
                            })
                        })
                    firebase.storage().ref('portfolios')
                        .child(exp.thumb).getDownloadURL()
                        .then(url => {
                            this.setState({
                                defaultThumb: url
                            })
                        })
                    this.updateFields(exp, 'Edit Portfolio', expId)
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
                if (this.state.formType === 'Edit Portfolio') {
                    firebaseDB.ref(`portfolios/${this.state.id}`)
                        .update(dataToSubmit).then(() => {
                            this.successForm('Updated correctly');
                        }).catch((e) => {
                            this.setState({ formError: true })
                        })
                } else {
                    firebasePortfolios.push(dataToSubmit).then(() => {
                        this.props.history.push('/admin/portfolios');
                    }).catch((e) => {
                        console.log(e)
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

    storeFilename = (filename, id) => {
        if (id === 'thumb') {
            this.updateImage({ id: 'thumb', event: filename })
        } else {
            this.updateImage({ id: 'image', event: filename })
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
            this.props.history.push('/admin/portfolios');
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
                                    <div className="row mb-4">
                                        <div className="col">
                                            <Fileuploader
                                                dir="portfolios"
                                                tag={"Thumbnail"}
                                                defaultImg={this.state.defaultThumb}
                                                defaultImgName={this.state.formData.thumb.value}
                                                resetImage={() => this.resetImage()}
                                                filename={(filename) => this.storeFilename(filename, 'thumb')}
                                            />
                                        </div>
                                        <div className="col">
                                            <Fileuploader
                                                dir="portfolios"
                                                tag={"Project Image"}
                                                defaultImg={this.state.defaultImg}
                                                defaultImgName={this.state.formData.image.value}
                                                resetImage={() => this.resetImage()}
                                                filename={(filename) => this.storeFilename(filename, 'image')}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
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
                                            id={'client'}
                                            formData={this.state.formData.client}
                                            change={(event) => this.updateForm(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.client.validationMessage
                                            : null
                                        }
                                        <FormField
                                            id={'category'}
                                            formData={this.state.formData.category}
                                            change={(event) => this.updateForm(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.category.validationMessage
                                            : null
                                        }
                                        <FormField
                                            id={'url'}
                                            formData={this.state.formData.url}
                                            change={(event) => this.updateForm(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.url.validationMessage
                                            : null
                                        }
                                        <FormField
                                            id={'completeDate'}
                                            formData={this.state.formData.completeDate}
                                            change={(event) => this.updateForm(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.completeDate.validationMessage
                                            : null
                                        }
                                        <FormField
                                            id={'sumary'}
                                            formData={this.state.formData.sumary}
                                            change={(event) => this.updateImage(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.sumary.validationMessage
                                            : null
                                        }
                                    </div>
                                    {this.state.formError ?
                                        <div className="error_label">
                                            Something is wrong
                                        </div>
                                        : ''
                                    }
                                    <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                                    <Link to="/admin/portfolios" className="ms-3"><Button variant="info" >Back</Button></Link>
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

export default AddEditPortfolio;