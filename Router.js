import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import DefaultScreen from "./src/containers/DefaultScreen";
import HomeScreen from "./src/containers/HomeScreen";
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="homescreen" component={HomeScreen} hideNavBar="true" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
