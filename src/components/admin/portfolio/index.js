import React, { Component } from 'react';
import { Spinner, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { firebasePortfolios, firebaseDB } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../ui/misc';
import * as Icons from 'react-bootstrap-icons'

class Portfolio extends Component {
    state = {
        isLoding: true,
        portfolios: []
    }

    componentDidMount() {
        firebasePortfolios.once('value').then(snapshot => {
            const portfolio = firebaseLooper(snapshot);
            this.setState({
                isLoding: false,
                portfolios: reverseArray(portfolio)
            })
        })
    }

    removeEducation(id) {
        firebaseDB.ref(`portfolios/${id}`).remove();
        window.location.reload();
    }

    render() {
        return (
            <section className="portfolio">
                <div className="container-fluid">
                    <Card border="primary">
                        <Card.Header>
                            <div className="float-start">
                                <h3>Portfolios</h3>
                            </div>
                            <div className="add-button float-end">
                                <Link to="/admin/portfolio/save">
                                    <Button variant="outline-secondary">Add Portfolio</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Client</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.portfolios ?
                                        this.state.portfolios.map((port, i) => (
                                            <tr key={port.id} >
                                                <td>{port.title}</td>
                                                <td>{port.client}</td>
                                                <td>{port.category}</td>
                                                <td>
                                                    <Link to={`/admin/portfolio/save/${port.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                                    {(this.props.user.role.role === 'admin') ?
                                                        <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(port.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
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

export default Portfolio;