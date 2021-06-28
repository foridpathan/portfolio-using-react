import React, { Component } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { firebaseSkills, firebaseDB } from '../../../../firebase';
import { firebaseLooper, reverseArray } from '../../../../ui/misc';

class Skills extends Component {

    state = {
        isLoding: true,
        skills: []
    }

    componentDidMount() {
        firebaseSkills.once('value').then(snapshot => {
            const skills = firebaseLooper(snapshot);
            this.setState({
                isLoding: false,
                skills: reverseArray(skills)
            })
        })
    }

    removeEducation(id) {
        firebaseDB.ref(`skills/${id}`).remove();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="per-tab pt-4 pb-4">
                    <div className="add-button text-end pb-4">
                        <Link to="/admin/skill/save">
                            <Button variant="outline-secondary">Add Skill</Button>
                        </Link>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Percentage</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.skills ?
                                this.state.skills.map((skill, i) => (
                                    <tr key={skill.id} >
                                        <td>{skill.title}</td>
                                        <td>{skill.percentage}%</td>
                                        <td>
                                            <Link to={`/admin/skill/save/${skill.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                            {(this.props.user.role.role === 'admin') ?
                                                <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(skill.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
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
                </div>
            </div>
        );
    }
}

export default Skills;