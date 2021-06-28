import React, { Component } from 'react';
import { Tag } from '../../../ui/misc';
import ServiceItems from './ServiceItems';

class Services extends Component {

    state = {
        tag: {
            title: 'Services',
            // sumary: 'Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.'
        }
    }

    render() {
        return (
            <section id="services" className="services">
                <div className="container">
                    <Tag
                        title={this.state.tag.title}>
                        {this.state.tag.sumary}
                    </Tag>

                    <ServiceItems/>
                </div>
            </section>
        );
    }
}

export default Services;