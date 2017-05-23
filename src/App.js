import _ from "lodash";

import React from "react";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";

import Brand from "./Brand";
import BRANDS from "./brands";
import reducer from "./api";

injectTapEventPlugin();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default function App() {
  return (
    <Provider {...{ store }}>
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
    </Provider>
  );
}
