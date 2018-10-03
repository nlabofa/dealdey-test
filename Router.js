import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import DefaultScreen from "./src/containers/DefaultScreen";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="defaultscreen"
          component={DefaultScreen}
          hideNavBar="true"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
