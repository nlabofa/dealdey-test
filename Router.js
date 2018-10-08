import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import DefaultScreen from "./src/containers/DefaultScreen";
import DealDetailScreen from "./src/containers/DealDetailScreen";
import CartListScreen from "./src/containers/CartListScreen";
import CheckOutScreen from "./src/containers/CheckOutScreen";
import HomeScreen from "./src/containers/HomeScreen";
import UserForm from "./src/containers/UserForm";
import ShippingForm from "./src/containers/ShippingForm";
import OrderSuccess from "./src/containers/OrderSuccess";
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
          key="defaultscreen"
          component={DefaultScreen}
          hideNavBar="true"
        />
        <Scene key="ordersuccess" component={OrderSuccess} hideNavBar="true" />
        <Scene
          key="dealdetail"
          component={DealDetailScreen}
          hideNavBar="true"
        />
        <Scene key="cartlist" component={CartListScreen} hideNavBar="true" />
        <Scene
          key="checkoutdetail"
          component={CheckOutScreen}
          hideNavBar="true"
        />
        <Scene key="userform" component={UserForm} hideNavBar="true" />
        <Scene
          key="shippingform"
          component={ShippingForm}
          hideNavBar="true"
          //initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
