import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import IntroSlider from "react-native-app-intro-slider";
import { IMAGE } from "../constants/Image";

export default class App extends Component {
  on_Done_all_slides = () => {
    this.props.navigation.navigate("HomeScreen");
  };

  on_Skip_slides = () => {
    this.props.navigation.navigate("HomeScreen");
  };
  render() {
    return (
      <IntroSlider
        slides={slides}
        onDone={this.on_Done_all_slides}
        showSkipButton={true}
        onSkip={this.on_Skip_slides}
      />
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  text: {
    color: "#fff",
    fontSize: 16
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});

const slides = [
  {
    key: "k1",
    title: "Welcome to KiwiMart",
    text: "Get the hottest fashion by trend and season right\n on your pocket.",
    image: IMAGE.intro1,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "#5C24B4"
  },
  {
    key: "k2",
    title: "Secure Payment",
    text: "All your payment information is top safety\n and protected",
    image: IMAGE.intro2,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "#027AC9"
  },
  {
    key: "k3",
    title: "Fast delivery",
    text: "Buy and sell in your comfort Zone",
    image: IMAGE.intro3,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "#3FB89B"
  },
  {
    key: "k4",
    title: "High Performance",
    text: " Saving your value time and buy product with ease",
    image: IMAGE.intro4,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "#F229AF"
  },
  {
    key: "k5",
    title: "Restaurant Bookings",
    text: " 20% off on first Restaurant booking",
    image: require("../assets/Images/intro5.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: "#FF3D00"
  }
];
