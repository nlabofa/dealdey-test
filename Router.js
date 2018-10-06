import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import DefaultScreen from "./src/containers/DefaultScreen";
import DealDetailScreen from "./src/containers/DealDetailScreen";
import CartListScreen from "./src/containers/CartListScreen";
import HomeScreen from "./src/containers/HomeScreen";
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="homescreen"
          component={HomeScreen}
          hideNavBar="true"
          initial
        />
        <Scene
          key="dealdetail"
          component={DealDetailScreen}
          hideNavBar="true"
        />
        <Scene key="cartlist" component={CartListScreen} hideNavBar="true" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
