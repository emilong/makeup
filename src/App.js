import _ from "lodash";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import Brand from "./Brand";
import BRANDS from "./brands";

injectTapEventPlugin();

export default function App() {
  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => <Redirect to={`/${_.sample(BRANDS)}`} />}
          />
          <Route path="/:brand" component={Brand} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
