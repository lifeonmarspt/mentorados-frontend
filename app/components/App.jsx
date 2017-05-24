import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthProvider from "components/AuthProvider";
import MetaProvider from "components/MetaProvider";
import Layout from "components/Layout";
import Resource from "reactAdmin/components/Resource";
import AnonymousRoute from "components/core/AnonymousRoute";
import AuthenticatedRoute from "components/core/AuthenticatedRoute";
import AdminRoute from "components/core/AdminRoute";
import SignUp from "components/pages/SignUp";
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


class App extends React.Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <MetaProvider>
            <Layout>
              <Switch>
                <AnonymousRoute exact path="/" component={Home} />
                <AnonymousRoute exact path="/signup" component={SignUp} />
                <AnonymousRoute exact path="/recover-password" component={RecoverPassword} />
                <AnonymousRoute exact path="/users/:id/confirm/:token" component={Confirmation} />
                <AnonymousRoute exact path="/users/:id/reset/:token" component={ResetPassword} />

                <AuthenticatedRoute exact path="/mentors" component={Mentors} />
                <AuthenticatedRoute exact path="/account" component={Account} />

                <AdminRoute exact path="/admin" component={AdminHome} />

                <AdminRoute path="/admin/users">
                  <Resource path="/admin/users" resource={userDescription} />
                </AdminRoute>
                <AdminRoute path="/admin/mentors">
                  <Resource path="/admin/mentors" resource={mentorDescription} />
                </AdminRoute>

                <Route exact path="*" component={NotFound} />
              </Switch>
            </Layout>
          </MetaProvider>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
