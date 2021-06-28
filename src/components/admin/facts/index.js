import React, { Component } from 'react';
import { Card, Button, Table, Spinner } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { firebaseDB, firebaseFacts } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../ui/misc';
import { IconPickerItem } from 'react-fa-icon-picker';

class Facts extends Component {

    state = {
        isLoding: true,
        facts: []
    }

    componentDidMount() {
        firebaseFacts.once('value').then(snapshot => {
            const facts = firebaseLooper(snapshot);
            this.setState({
                isLoding: false,
                facts: reverseArray(facts)
            })
        })
    }

    removeEducation(id) {
        firebaseDB.ref(`facts/${id}`).remove();
        window.location.reload();
    }

    render() {
        return (
            <section className="facts">
                <div className="container-fluid">
                    <Card border="primary">
                        <Card.Header>
                            <div className="float-start">
                                <h3>Facts</h3>
                            </div>
                            <div className="add-button float-end">
                                <Link to="/admin/fact/save">
                                    <Button variant="outline-secondary">Add Fact</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Counter</th>
                                        <th>Icon</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.facts ?
                                        this.state.facts.map((fact, i) => (
                                            <tr key={fact.id} >
                                                <td>{fact.title}</td>
                                                <td>{fact.counter}</td>
                                                <td><IconPickerItem icon={fact.icon} size={20} color="#000" /></td>
                                                <td>
                                                    <Link to={`/admin/fact/save/${fact.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                                    {(this.props.user.role.role === 'admin') ?
                                                        <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(fact.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
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

export default Facts;