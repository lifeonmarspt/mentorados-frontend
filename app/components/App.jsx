import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import anonymousRoute from "enhancers/anonymousRoute";
import authenticatedRoute from "enhancers/authenticatedRoute";
import adminRoute from "enhancers/adminRoute";

import Layout from "components/Layout";
import Resource from "reactAdmin/components/Resource";
import AdminRoute from "components/core/AdminRoute";
import RecoverPassword from "components/pages/RecoverPassword";
import ResetPassword from "components/pages/ResetPassword";
import Confirmation from "components/pages/Confirmation";
import Home from "components/pages/Home";
import AdminHome from "components/pages/admin/Home";
import Mentors from "components/pages/Mentors";
import Account from "components/pages/Account";
import NotFound from "components/pages/NotFound";

import mentorDescription from "resources/mentors";
import userDescription from "resources/users";

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={anonymousRoute(Home)} />
        <Route exact path="/recover-password" component={anonymousRoute(RecoverPassword)} />

        <Route exact path="/users/:id/confirm/:token" component={anonymousRoute(Confirmation)} />
        <Route exact path="/users/:id/reset/:token" component={anonymousRoute(ResetPassword)} />

        <Route exact path="/mentors" component={authenticatedRoute(Mentors)} />
        <Route exact path="/account" component={authenticatedRoute(Account)} />

        <Route exact path="/admin" component={adminRoute(AdminHome)} />
        <AdminRoute path="/admin/users">
          <Resource path="/admin/users" resource={userDescription} />
        </AdminRoute>
        <AdminRoute path="/admin/mentors">
          <Resource path="/admin/mentors" resource={mentorDescription} />
        </AdminRoute>

        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
