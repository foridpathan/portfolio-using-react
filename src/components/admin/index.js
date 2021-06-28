import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { firebaseDB } from '../../firebase';
import * as Icons from 'react-bootstrap-icons'

class Dashboard extends Component {
    state = {
        liveVisitor: 0,
        totalVisitor: 0
    }

    componentDidMount() {
        firebaseDB.ref('/tempUser/').orderByChild('state').equalTo("online").on("value", (data => {
            var liveVisitorCounter = data.numChildren();
            this.setState({
                liveVisitor: liveVisitorCounter
            })
        }))
        firebaseDB.ref('/tempUser/').on("value", (data => {
            var liveVisitorCounter = data.numChildren();
            this.setState({
                totalVisitor: liveVisitorCounter
            })
        }))
    }


    render() {
        return (
            <section className="inner-page">
                <div className="container">
                    <div className="dashboard">
                        <div className="row" >
                            <div className="col">
                                <Card className="custom-card">
                                    <div className="card-icon">
                                        <Icons.GraphUp />
                                    </div>
                                    <div className="card-custom-body">
                                        <Card.Body>
                                            <Card.Title>Realtime Visitor</Card.Title>
                                            <h1>{this.state.liveVisitor}</h1>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </div>
                            <div className="col">
                                <Card className="custom-card">
                                    <div className="card-icon bg-success">
                                        <Icons.BarChartLineFill />
                                    </div>
                                    <div className="card-custom-body">
                                        <Card.Body>
                                            <Card.Title>Total Visitor</Card.Title>
                                            <h1>{this.state.totalVisitor}</h1>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Dashboard;