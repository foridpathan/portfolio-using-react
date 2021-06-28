import React, { useState } from 'react';
import { Alert, Form, InputGroup } from 'react-bootstrap'
import ReactQuill from 'react-quill/';
import 'react-quill/dist/quill.snow.css';
import { IconPicker } from 'react-fa-icon-picker';

const FormField = ({ formData, id, change }) => {

    const [show, setShow] = useState(false);

    const showError = () => {
        let templage = <Alert
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
        >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            {
                formData.validation && !formData.valid ?
                    formData.validationMessage
                    : null
            }
        </Alert>
        if (show) return templage
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch (formData.element) {
            case ('input'):
                formTemplate = (
                    <Form.Group controlId={formData.config.name}>
                        {formData.showlabel ?
                            <Form.Label>
                                {formData.config.label} {formData.validation.required ? <span className="text-red">*</span> : null}
                            </Form.Label>
                            : null
                        }

                        {formData.append ?
                            <InputGroup>
                                <Form.Control
                                    {...formData.config}
                                    value={formData.value}
                                    onChange={(event) => change({ event, id })} />

                                <InputGroup.Append>
                                    <InputGroup.Text>{formData.config.appendText}</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            :
                            <Form.Control
                                {...formData.config}
                                value={formData.value}
                                onChange={(event) => change({ event, id })} />
                        }
                        {showError()}
                    </Form.Group>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div>
                        {formData.showlabel ?
                            <Form.Label>
                                {formData.config.label} {formData.validation.required ? <span className="text-red">*</span> : null}
                            </Form.Label>
                            : null
                        }
                        <select
                            value={formData.value}
                            onChange={(event) => change({ event, id })}
                            className="form-control"
                        >
                            <option value="">Select one</option>
                            {
                                formData.config.options.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
                break;
            case ('textarea'):
                formTemplate = (
                    <Form.Group controlId={formData.config.name}>
                        {formData.showlabel ?
                            <Form.Label>
                                {formData.config.label} {formData.validation.required ? <span className="text-red">*</span> : null}
                            </Form.Label>
                            : null
                        }
                        <Form.Control
                            {...formData.config}
                            as="textarea"
                            value={formData.value}
                            onChange={(event) => change({ event, id })} />
                        {showError()}
                    </Form.Group>
                )
                break;
            case ('editor'):
                formTemplate = (
                    <div>
                        {formData.showlabel ?
                            <Form.Label>
                                {formData.config.label} {formData.validation.required ? <span className="text-red">*</span> : null}
                            </Form.Label>
                            : null
                        }
                        <ReactQuill
                            {...formData.config}
                            theme='snow'
                            value={formData.value}
                            onChange={(event) => change({ event, id })}
                        />
                    </div>
                )
                break;
            case ('iconpicker'):
                formTemplate = (
                    <div>
                        {formData.showlabel ?
                            <Form.Label>
                                {formData.config.label} {formData.validation.required ? <span className="text-red">*</span> : null}
                            </Form.Label>
                            : null
                        }
                        <InputGroup>
                            <Form.Control
                                readOnly
                                value={formData.value} />

                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <IconPicker
                                        {...formData.config}
                                        value={formData.value}
                                        onChange={(event) => change({ event, id })}
                                    />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                    </div>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }


    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;