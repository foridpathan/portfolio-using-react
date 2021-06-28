import React, { Component } from 'react';
import { Card, Button, Table, Spinner } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { firebaseDB, firebaseTestimonials } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../ui/misc';


class Testimonials extends Component {

    state = {
        isLoding: true,
        testimonials: []
    }

    componentDidMount() {
        firebaseTestimonials.once('value').then(snapshot => {
            const testimonials = firebaseLooper(snapshot);
            this.setState({
                isLoding: false,
                testimonials: reverseArray(testimonials)
            })
        })
    }

    removeEducation(id) {
        firebaseDB.ref(`testimonials/${id}`).remove();
        window.location.reload();
    }

    render() {
        return (
            <section className="testimonial">
                <div className="container-fluid">
                    <Card border="primary">
                        <Card.Header>
                            <div className="float-start">
                                <h3>Testimonials</h3>
                            </div>
                            <div className="add-button float-end">
                                <Link to="/admin/testimonial/save">
                                    <Button variant="outline-secondary">Add Testimonials</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Counter</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.testimonials ?
                                        this.state.testimonials.map((fact, i) => (
                                            <tr key={fact.id} >
                                                <td>{fact.name}</td>
                                                <td>{fact.position}</td>
                                                <td>
                                                    <Link to={`/admin/testimonial/save/${fact.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
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

export default Testimonials;