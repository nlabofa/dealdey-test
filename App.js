import React, { Component } from "react";
import configureStore from "./src/store/reducers/configureStore";
import Router from "./Router";
import { Provider } from "react-redux";
export default class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
