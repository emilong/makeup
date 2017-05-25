import _ from "lodash";

import React from "react";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import Brand from "./Brand";
import BRANDS from "./brands";
import BrandStore from "./brand-store";

injectTapEventPlugin();

const store = new BrandStore(window.__PRELOADED_STATE__);
window.__PRELOADED_STATE__ = store;

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Route
          exact
          path="/"
          render={() => <Redirect to={`/${_.sample(BRANDS)}`} />}
        />
        <Route
          path="/:brand"
          render={props => {
            const passdownProps = {
              store,
              brand: props.match.params.brand,
              ...props
            };

            return <Brand {...passdownProps} />;
          }}
        />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
