import React, { Component } from 'react';
import { ServiceUI, firebaseLooper, reverseArray } from '../../../ui/misc';
import { firebaseServices } from '../../../firebase';

class ServiceItems extends Component {

    state = {
        services: []
    }

    componentDidMount() {
        firebaseServices.once('value').then(snapshot => {
            const services = firebaseLooper(snapshot);
            this.setState({
                services: reverseArray(services)
            })
        })
    }

    showServices = () => (
        this.state.services.map((service, i) => (
            <ServiceUI
                key={i}
                delay={ 100 * i }
                icon={ service.icon }
                title={ service.title }
                sumary={ service.sumary }
            />
        ))
    )

    render() {
        return (
            <div className="row">
                {this.showServices()}
            </div>
        );
    }
}

export default ServiceItems;