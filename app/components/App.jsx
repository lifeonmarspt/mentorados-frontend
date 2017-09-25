import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import anonymousRoute from "enhancers/anonymousRoute";
import authenticatedRoute from "enhancers/authenticatedRoute";
import adminRoute from "enhancers/adminRoute";

import AuthProvider from "components/AuthProvider";
import MetaProvider from "components/MetaProvider";
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
import Blocked from "components/pages/Blocked";

import mentorDescription from "resources/mentors";
import userDescription from "resources/users";

const App = () => (
  <Router>

    <AuthProvider>
      <MetaProvider>

        <Route path="*">
          <Layout>
            <Switch>

              <Route exact path="/" component={anonymousRoute(Home)} />
              <Route exact path="/recover-password" component={anonymousRoute(RecoverPassword)} />

              <Route exact path="/blocked" component={Blocked} />
              <Route exact path="/not-found" component={NotFound} />

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

              <Redirect to="/not-found" />

            </Switch>
          </Layout>
        </Route>

      </MetaProvider>
    </AuthProvider>

  </Router>
);

export default App;
