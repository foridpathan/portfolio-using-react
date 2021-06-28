import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebase, firebaseDB } from '../../firebase';

import './auth.css'
import SocialMediaSignin from './SocialMediaSignin';

class SignInOrSignup extends Component {
    state = {
        activeRight: false,
        signupFormError: false,
        signinFormError: false,
        signinFormData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        },
        signupFormData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateSignupForm(element) {
        const newFormdata = { ...this.state.signupFormData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]
        newFormdata[element.id] = newElement;

        this.setState({
            signupFormData: newFormdata
        })

        if (validData[0] === false) {
            this.setState({
                signupFormError: true
            })
        } else {
            this.setState({
                signupFormError: false
            })
        }
    }
    updateSigninForm(element) {
        const newFormdata = { ...this.state.signinFormData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]
        newFormdata[element.id] = newElement;

        this.setState({
            signinFormData: newFormdata
        })

        if (validData[0] === false) {
            this.setState({
                signinFormError: true
            })
        } else {
            this.setState({
                signinFormError: false
            })
        }
    }

    signupFormSubmit = (e) => {
        e.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.signupFormData) {
            if ((this.state.signupFormData[key].value === '') && (this.state.signupFormData[key].validation.required === true)) {
                const newFormdata = { ...this.state.signupFormData }
                const newElement = { ...this.state.signupFormData[key] }
                let validData = validate(newElement)
                newElement.valid = validData[0];
                newElement.validationMessage = validData[1]
                newFormdata[key] = newElement;

                this.setState({
                    signupFormData: newFormdata
                })

                formIsValid = false;
            } else {
                dataToSubmit[key] = this.state.signupFormData[key].value;
                formIsValid = this.state.signupFormData[key].valid && formIsValid;
            }
        }

        if (formIsValid) {
            // console.log(dataToSubmit)
            firebase.auth()
                .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                .then((result) => {
                    const user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: dataToSubmit.name
                    })

                    firebaseDB.ref('user_roles/' + user.uid).set({
                        _id: user.uid,
                        role: 'User',
                      });
                    console.log("user_r" + user)
                }).catch(error => {
                    console.log("user_e" + error.message)
                })
        } else {
            this.setState({
                signupFormError: true
            })
        }
    }

    signinFormSubmit = (e) => {
        e.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.signinFormData) {
            if ((this.state.signinFormData[key].value === '') && (this.state.signinFormData[key].validation.required === true)) {
                const newFormdata = { ...this.state.signinFormData }
                const newElement = { ...this.state.signinFormData[key] }
                let validData = validate(newElement)
                newElement.valid = validData[0];
                newElement.validationMessage = validData[1]
                newFormdata[key] = newElement;

                this.setState({
                    signinFormData: newFormdata
                })

                formIsValid = false;
            } else {
                dataToSubmit[key] = this.state.signinFormData[key].value;
                formIsValid = this.state.signinFormData[key].valid && formIsValid;
            }
        }

        if (formIsValid) {
            // console.log(dataToSubmit)
            firebase.auth()
                .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                .then((result) => {
                    this.props.history.push('/admin/dashboard')
                }).catch(error => {
                    this.setState({
                        signinFormError: true
                    })
                })
        } else {
            this.setState({
                signinFormError: true
            })
        }
    }

    signUpButton = () => {
        this.setState({
            activeRight: true
        })
    }

    signInButton = () => {
        this.setState({
            activeRight: false
        })
    }

    showError = (message) => (
        message
    )

    render() {
        return (
            <div className="auth_wrap">
                <div className={this.state.activeRight ? 'container right-panel-active' : 'container'} id="container">
                    <div className="form-container sign-up-container">
                        <form
                            onSubmit={(event) => { this.signupFormSubmit(event) }}
                        >
                            <h1>Create Account</h1>
                            <SocialMediaSignin />
                            <span>or use your email for registration</span>
                            <FormField
                                id={'name'}
                                formData={this.state.signupFormData.name}
                                change={(event) => this.updateSignupForm(event)}
                            />
                            {this.state.signupFormError ?
                                this.showError(this.state.signupFormData.name.validationMessage)
                                : null
                            }
                            <FormField
                                id={'email'}
                                formData={this.state.signupFormData.email}
                                change={(event) => this.updateSignupForm(event)}
                            />
                            {this.state.signupFormError ?
                                this.showError(this.state.signupFormData.email.validationMessage)
                                : null
                            }
                            <FormField
                                id={'password'}
                                formData={this.state.signupFormData.password}
                                change={(event) => this.updateSignupForm(event)}
                            />
                            {this.state.signupFormError ?
                                this.showError(this.state.signupFormData.password.validationMessage)
                                : null
                            }
                            <button type="submit" >Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={(e) => this.signinFormSubmit(e)}>
                            <h1>Sign in</h1>
                            <SocialMediaSignin />
                            <span>or use your account</span>
                            <FormField
                                id={'email'}
                                formData={this.state.signinFormData.email}
                                change={(event) => this.updateSigninForm(event)}
                            />
                            {this.state.signinFormError ?
                                this.showError(this.state.signinFormData.email.validationMessage)
                                : null
                            }
                            <FormField
                                id={'password'}
                                formData={this.state.signinFormData.password}
                                change={(event) => this.updateSigninForm(event)}
                            />
                            {this.state.signinFormError ?
                                this.showError(this.state.signinFormData.password.validationMessage)
                                : null
                            }
                            <Link to="#">Forgot your password?</Link>
                            <button type="submit" >Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" onClick={() => this.signInButton()} >Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={() => this.signUpButton()} >Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInOrSignup;