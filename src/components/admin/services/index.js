import React, { Component } from 'react';
import { Card, Button, Table, Spinner } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { firebaseDB, firebaseServices } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../ui/misc';
import { IconPickerItem } from 'react-fa-icon-picker';

class Services extends Component {

    state = {
        isLoding: true,
        services: []
    }

    componentDidMount() {
        firebaseServices.once('value').then(snapshot => {
            const services = firebaseLooper(snapshot);
            this.setState({
                isLoding: false,
                services: reverseArray(services)
            })
        })
    }

    removeEducation(id) {
        firebaseDB.ref(`services/${id}`).remove();
        window.location.reload();
    }

    render() {
        return (
            <section className="services">
                <div className="container-fluid">
                    <Card border="primary">
                        <Card.Header>
                            <div className="float-start">
                                <h3>Services</h3>
                            </div>
                            <div className="add-button float-end">
                                <Link to="/admin/service/save">
                                    <Button variant="outline-secondary">Add Service</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Sumary</th>
                                        <th>Icon</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.services ?
                                        this.state.services.map((service, i) => (
                                            <tr key={service.id} >
                                                <td>{service.title}</td>
                                                <td>{service.sumary}</td>
                                                <td><IconPickerItem icon={service.icon} size={20} color="#000" /></td>
                                                <td>
                                                    <Link to={`/admin/service/save/${service.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                                    {(this.props.user.role.role === 'admin') ?
                                                        <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(service.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
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
                        </Card.Body>
                    </Card>
                </div>
            </section>
        );
    }
}

export default Services;