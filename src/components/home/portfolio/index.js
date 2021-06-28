import React, { Component } from 'react';
import { firebasePortfolios, firebase } from '../../../firebase';
import { firebaseLooper, Tag } from '../../../ui/misc';
import * as Icons from 'react-bootstrap-icons'
import { Promise } from 'core-js';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

import Button from './Button';
import { Link } from 'react-router-dom';


class Portfolio extends Component {

    state = {
        filter: 'all',
        portfolios: [],
        filterPortfolios: []
    }

    componentDidMount() {
        firebasePortfolios.once('value').then(snapshot => {
            const portfolio = firebaseLooper(snapshot);
            let promises = [];
            for (let key in portfolio) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('portfolios')
                            .child(portfolio[key].thumb).getDownloadURL()
                            .then(url => {
                                portfolio[key].trumbUrl = url;
                                resolve();
                            })
                    })
                )
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('portfolios')
                            .child(portfolio[key].image).getDownloadURL()
                            .then(url => {
                                portfolio[key].imageUrl = url;
                                resolve();
                            })
                    })
                )
            }

            Promise.all(promises).then(() => {
                this.setState({
                    portfolios: portfolio,
                    filterPortfolios: portfolio
                })
            })
        })
    }

    filterPortfolio = (filter) => {
        const list = this.state.portfolios.filter((result) => {
            return result.category === filter
        });

        this.setState({
            filterPortfolios: filter === 'all' ? this.state.portfolios : list,
            filter: filter
        })
    }

    render() {
        return (
            <section id="portfolio" className="portfolio">
                <div className="container">
                    <Tag title="Portfolio" />

                    <div className="row" data-aos="fade-up">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <ul id="portfolio-flters">
                                <li className={`option ${this.state.filter === 'all' ? 'filter-active' : ''}`}
                                    onClick={() => this.filterPortfolio('all')} >All</li>
                                <li className={`option ${this.state.filter === 'reactjs' ? 'filter-active' : ''}`}
                                    onClick={() => this.filterPortfolio('reactjs')}>React Js</li>
                                <li className={`option ${this.state.filter === 'php' ? 'filter-active' : ''}`}
                                    onClick={() => this.filterPortfolio('php')}>PHP (CLI & Laravel)</li>
                                <li className={`option ${this.state.filter === 'wordpress' ? 'filter-active' : ''}`}
                                    onClick={() => this.filterPortfolio('wordpress')}>WordPress</li>
                                <li className={`option ${this.state.filter === 'html_css' ? 'filter-active' : ''}`}
                                    onClick={() => this.filterPortfolio('html_css')}>HTML & CSS</li>
                            </ul>
                        </div>
                    </div>

                    <SimpleReactLightbox>
                        <div className="portfolio-container">
                            <SRLWrapper>
                                {this.state.filterPortfolios ?
                                    this.state.filterPortfolios.map((prt, i) => (
                                        <div className="col-lg-4 col-md-6 portfolio-item" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                                            <div className="portfolio-wrap">
                                                <img src={prt.trumbUrl} className="img-fluid" alt="" />
                                                <div className="portfolio-links">

                                                    <Button imageToOpen={i} />
                                                    <Link to={{
                                                        pathname: `project/${prt.id}`,
                                                        productdetail: {
                                                            ...prt
                                                        }
                                                    }} >
                                                        <Icons.Link />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : null}
                            </SRLWrapper>
                        </div>
                    </SimpleReactLightbox>
                </div>
            </section>
        );
    }
}

export default Portfolio;