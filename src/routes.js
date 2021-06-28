import React from 'react';
import { Switch, Route } from 'react-router-dom'

import PublicRoutes from './components/authRoutes/publicRoutes';
import PrivateRoutes from './components/authRoutes/privateRoutes';

import Home from './components/home';
import SignInOrSignup from './components/user_auth//SignInAndSignup';
import Dashboard from './components/admin';
import NotFound from './components/404/NotFound';
import Personality from './components/admin/personality';
import Services from './components/admin/services';
import Facts from './components/admin/facts';
import Testimonials from './components/admin/testimonials';
import Profile from './components/admin/profile';
import Logout from './components/user_auth/Logout';

import EducationEdit from './components/admin/personality/educations/Edit';
import EditTraining from './components/admin/personality/trining/Edit';
import AddEditExperience from './components/admin/personality/experiences/addEditExperience';
import AddEditSkill from './components/admin/personality/skills/addEditSkill';
import AddEditService from './components/admin/services/addEditService';
import AddEditFact from './components/admin/facts/addEditFacts';
import AddEditTestimonial from './components/admin/testimonials/addEditTestimonial';
import Portfolio from './components/admin/portfolio';
import AddEditPortfolio from './components/admin/portfolio/addEditPortfolio';
import ProjectDetails from './components/home/portfolio/details';

const Routes = (props) => {
    
    return (
        <Switch>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditPortfolio} 
            path="/admin/portfolio/save" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditPortfolio} 
            path="/admin/portfolio/save/:id" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditTestimonial} 
            path="/admin/testimonial/save" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditTestimonial} 
            path="/admin/testimonial/save/:id" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditFact} 
            path="/admin/fact/save" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditFact} 
            path="/admin/fact/save/:id" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditService} 
            path="/admin/service/save" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditService} 
            path="/admin/service/save/:id" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditSkill} 
            path="/admin/skill/save" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditSkill} 
            path="/admin/skill/save/:id" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditExperience} 
            path="/admin/experience/save" />
            <PrivateRoutes {...props} restricted={true} exact component={AddEditExperience} 
            path="/admin/experience/save/:id" />
            <PrivateRoutes {...props} restricted={true} exact component={EditTraining} 
            path="/admin/training/edit/:id" />

            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={EducationEdit} 
            path="/admin/education/edit/:id" />


            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Portfolio} 
            path="/admin/portfolios" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Profile} 
            path="/admin/profile" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Testimonials} 
            path="/admin/testimonials" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Facts} 
            path="/admin/facts" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Services} 
            path="/admin/services" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Personality} 
            path="/admin/personality" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Dashboard} 
            path="/admin/dashboard" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Dashboard} 
            path="/admin" />
            <PrivateRoutes 
            {...props} restricted={true} exact 
            component={Logout} 
            path="/admin/logout" />


            <PublicRoutes {...props} restricted={true} exact component={SignInOrSignup} path="/userauth" />
            <PublicRoutes {...props} restricted={false} exact component={ProjectDetails} path="/project/:id" />
            <PublicRoutes {...props} restricted={false} exact component={Home} path="/" />
            <Route exact component={NotFound} path="" />
        </Switch>

    );
};

export default Routes;