import React from "react";

import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components";
import Header from "../components/Header";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Image source={require("../assets/Images/watch.png")} />
        <Image1 source={require("../assets/Images/clovec.png")} />
        <Image2 source={require("../assets/Images/shovec.jpg")} />
        <Image3 source={require("../assets/Images/lapvec.jpg")} />
        <Image4 source={require("../assets/Images/elect.png")} />
        <Image5 source={require("../assets/Images/assvec.png")} />
        <Name>Laptops</Name>
        <Name2>Electronics</Name2>
        <Name3>Clothing</Name3>
        <Name4>Accessories</Name4>
        <Name5>Watches</Name5>
        <Name6>Shoes</Name6>

        <SafeAreaView>
          <Header />
          <TitleBar>
            <Title>Choose Your Category</Title>
            <View style={styles.container}></View>
          </TitleBar>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const Name = styled.Text`
  font-size: 20px;
  top: 200;
  left: 200;
  font-weight: bold;
  color: #3c4560;
`;
const Name2 = styled.Text`
  font-size: 20px;
  top: 325;
  left: 200;
  font-weight: bold;
  color: #3c4560;
`;
const Name3 = styled.Text`
  font-size: 20px;
  top: 295;
  left: 70;
  font-weight: bold;
  color: #3c4560;
`;
const Name4 = styled.Text`
  font-size: 20px;
  top: 418;
  left: 190;
  font-weight: bold;
  color: #3c4560;
`;
const Name5 = styled.Text`
  font-size: 20px;
  top: 83;
  left: 70;
  font-weight: bold;
  color: #3c4560;
`;
const Name6 = styled.Text`
  font-size: 20px;
  top: 360;
  left: 70;
  font-weight: bold;
  color: #3c4560;
`;
const Image = styled.Image`
  width: 110px;
  height: 100px;
  background: white;
  border-radius: 5px;
  margin-left: 20px;
  position: absolute;
  top: 100;
  left: 20;
`;
const Image1 = styled.Image`
  width: 110px;
  height: 100px;
  background: black;
  border-radius: 5px;
  margin-left: 20px;
  position: absolute;
  top: 250;
  left: 20;
`;
const Image2 = styled.Image`
  width: 110px;
  height: 100px;
  background: black;
  border-radius: 5px;
  margin-left: 20px;
  position: absolute;
  top: 400;
  left: 20;
`;

const Image3 = styled.Image`
  width: 110px;
  height: 100px;
  background: black;
  border-radius: 5px;
  margin-left: 20px;
  position: absolute;
  top: 100;
  left: 160;
`;
const Image4 = styled.Image`
  width: 110px;
  height: 100px;
  background: black;
  border-radius: 5px;
  margin-left: 20px;
  position: absolute;
  top: 250;
  left: 160;
`;
const Image5 = styled.Image`
  width: 110px;
  height: 100px;
  background: white;
  border-radius: 5px;
  margin-left: 20px;
  position: absolute;
  top: 400;
  left: 160;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`;

const Title = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
  top: -230;
  left: 30;
`;

const Name1 = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
  top: -190;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 70px;
`;
