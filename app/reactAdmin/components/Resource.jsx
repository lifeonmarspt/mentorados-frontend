import React from "react";
import { Switch, Route } from "react-router-dom";

import Page from "reactAdmin/components/Page";
import New from "reactAdmin/components/New";
import List from "reactAdmin/components/List";
import Show from "reactAdmin/components/Show";
import Edit from "reactAdmin/components/Edit";
import Delete from "reactAdmin/components/Delete";

class Resource extends React.Component {
  render() {
    return (
      <Switch>
        {
          [
            ["", List],
            ["/new", New],
            ["/:id", Show],
            ["/:id/edit", Edit],
            ["/:id/delete", Delete],
          ].map(
            ([path, Component]) => {
              return <Route
                exact
                key={path}
                path={`${this.props.path}${path}`}
                component={({ match }) => (
                  <Page
                    resource={this.props.resource}
                    Component={Component}
                    id={match.params.id}
                  />
                )}
              />
            }
          )
        }
      </Switch>
    );
  }
}

export default Resource;
