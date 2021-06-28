import { Markup } from 'interweave';
import React, { Component } from 'react';
import * as Icons from 'react-bootstrap-icons'

class ProjectDetails extends Component {

    state = {
        projectDetail: []
    }

    componentDidMount() {
        if(this.props.location.productdetail) {
            this.setState({
                projectDetail: this.props.location.productdetail
            })
        } else {
            this.props.history.goBack()
        }
    }


    render() {
        return (
            <div>
                <section id="breadcrumbs" className="breadcrumbs">
                    <div className="container">

                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-primary" onClick={() => {this.props.history.goBack();}}><Icons.ArrowLeft /></button>
                            <h2>Project Details</h2>
                        </div>

                    </div>
                </section>
                <section id="portfolio-details" className="portfolio-details">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-8">
                                <div className="portfolio-details-slider">
                                    <img src={this.state.projectDetail.imageUrl} alt="" />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="portfolio-info">
                                    <h3>Project information</h3>
                                    <ul>
                                        <li><strong>Category</strong>: {this.state.projectDetail.category}</li>
                                        <li><strong>Client</strong>: {this.state.projectDetail.client}</li>
                                        <li><strong>Project date</strong>: {this.state.projectDetail.completeDate}</li>
                                        <li><strong>Project URL</strong>: <a href={this.state.projectDetail.url}>{this.state.projectDetail.url}</a></li>
                                    </ul>
                                </div>
                                <div className="portfolio-description">
                                    <h2>{this.state.projectDetail.title}</h2>
                                    <Markup content={this.state.projectDetail.sumary} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProjectDetails;