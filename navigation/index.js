import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import DrawerNavigation from "./DrawerNavigation";

import { Splash, IntroSlider, Terms, Forgot} from "../Screens";
import Header from "../components/Header";

const navOptionHandler = ({ navigation }) => ({
  header: () => false,
});

const otherStack = createStackNavigator({
  Terms: {
    screen: Terms,
    navigationOptions: navOptionHandler
  },
  Forgot: {
    screen: Forgot,
    navigationOptions: navOptionHandler
  },
});

const initialStack = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: navOptionHandler
  },
  IntroSlider: {
    screen: IntroSlider,
    navigationOptions: navOptionHandler
  }
});

const Mainapp = createSwitchNavigator(
  {
    app: DrawerNavigation,
    init: initialStack,
    otherStack: otherStack
  },
  {
    initialRouteName: "init"
  }
);

export default createAppContainer(Mainapp);
