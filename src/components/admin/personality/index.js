import React from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import Education from './educations';
import Experience from './experiences';
import Skills from './skills';
import Training from './trining';

const Personality = () => {
    return (
        <section className="personality">
            <div className="container-fluid">
                <Card border="primary">
                    <Card.Header><h3>Personalities</h3></Card.Header>
                    <Card.Body>
                        <Tabs 
                            defaultActiveKey="education"
                            id="personality-tab"
                        >
                            <Tab eventKey="education" title="Education" >
                                <Education/>
                            </Tab>
                            <Tab eventKey="training" title="Training" >
                                <Training/>
                            </Tab>
                            <Tab eventKey="experience" title="Experience" >
                                <Experience/>
                            </Tab>
                            <Tab eventKey="skills" title="Skills" >
                                <Skills/>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </div>
        </section>
    );
};

export default Personality;