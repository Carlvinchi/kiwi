import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  ActivityIndicator
} from "react-native";

const IMG_SRC = require("../assets/Images/logo.png");

class Splash extends Component {
  async componentDidMount() {
    const data = await this.navigateToHome();
    if (data !== null) {
      this.props.navigation.navigate("IntroSlider");
    }
  }
  navigateToHome = async () => {
    // Splash screen will remain visible for 2 seconds
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    return wait(1000).then(() => this.props.navigation.navigate("IntroSlider"));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={IMG_SRC} style={styles.image} />
        <ActivityIndicator size={"large"} color="white" />
        <Text style={styles.loadingText}> KiwiMart </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(42,55,68)"
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
    top: 300,
    right: 0,
    left: 65,
    width: "50%"
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    paddingTop: 30
  }
});

export default Splash;
