import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import * as Animated from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false
    };
  }

  textInputChange(value) {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true
      });
    } else {
      this.setState({
        check_textInputChange: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignInScreen")}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                style={styles.backIcon}
                name="ios-arrow-back"
                size={20}
              />
              <Text style={styles.backTxt}>Back</Text>
            </View>
          </TouchableOpacity>
          <Image
            source={require("../assets/Images/SignUpLogo.png")}
            style={styles.backgroudImage}
          />
          <Text style={styles.txt_Header}>Account Verification</Text>
        </View>
        <Animated.View style={styles.footer} animation="fadeInUpBig">
          <Text style={[styles.txt_Footer, { marginTop: 15 }]}>Email</Text>
          <View style={styles.action}>
            <Feather name="mail" color="black" size={25} />
            <TextInput
              placeholder="Enter Email"
              style={styles.txtInput}
              onChangeText={text => this.textInputChange(text)}
            />

            {this.state.check_textInputChange ? (
              <Animated.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={25} />
              </Animated.View>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() =>
              console.log("Please open your email and proceed from there")
            }
          >
            <View style={styles.button}>
              <LinearGradient
                colors={["#00A79B", "#31BFB5", "#00A79B"]}
                style={styles.SignUp}
              >
                <Text style={styles.txtSign}>Send</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

//const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07485B"
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  txt_Header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25
  },

  footer: {
    flex: 3,
    backgroundColor: "white",
    paddingHorizontal: 20,
    shadowOpacity: 0.1,
    borderBottomWidth: 1,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 150,
    borderRadius: 20,
    shadowColor: "#000"
  },
  txt_Footer: {
    color: "#05375a",
    fontSize: 18
  },
  button: {
    marginTop: 50,
    alignItems: "center",
    marginTop:100,
  },
  SignUp: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  txtSign: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5
  },
  txtInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a"
  },
  backgroudImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 55,
    width: "95%",
    opacity: 2.5
  },
  backTxt: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingLeft: 5,
    paddingVertical: 70
  },
  backIcon: {
    paddingTop: 75,
    color: "white"
  }
});
