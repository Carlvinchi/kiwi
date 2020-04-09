import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  AsyncStorage
} from "react-native";

import * as Animated from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { IMAGE } from "../constants/Image";

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      Username: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true
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
  secureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }
  sendCred= async(data)=>{
    //const {UserEmail,password} = this.state;
            const rules = {
                UserEmail: 'required|string',
                userName
            }

      try {
        fetch("http://192.168.42.114:3000/signin", {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
              email:data.UserEmail,
              userName:data.UserEmail,
              password:data.password
    
          })
    
        }) 
          .then(res=>res.json())
          .then(async (data)=>{
            console.log(data);
            try {
              await AsyncStorage.setItem('token', data.token);
              console.log("Your login");
              this.props.navigation.navigate("HomeScreen");
            } catch (e) {
              // saving error
              console.log("error logging in :", e);
            }    
          })
        
      } catch (error) {
          console.log(error);
      }
          
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 5,
              marginRight: 300,
              marginBottom: 10
            }}
          ></View>
          <Image
            source={IMAGE.logo}
            style={styles.backgroudImage}
          />
          <Text style={styles.txt_Header}>Welcome</Text>
        </View>

        <Animated.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.txt_Footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="black" size={25} />
            <TextInput
              placeholder="Enter Email/Username"
              style={styles.txtInput}
              value={this.state.UserEmail}
              onChangeText={Email =>
                this.setState({
                  UserEmail:Email,
                  check_textInputChange:true
                })
              }
            />

            {this.state.check_textInputChange ? (
              <Animated.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={25} />
              </Animated.View>
            ) : null}
          </View>
          <Text style={[styles.txt_Footer, { marginTop: 35 }]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="black" size={25} />
            {this.state.secureTextEntry ? (
              <TextInput
                placeholder="Enter your Password"
                secureTextEntry={true}
                style={styles.txtInput}
                value={this.state.password}
                onChangeText={password =>
                  this.setState({
                    password: password
                  })
                }
              />
            ) : (
              <TextInput
                placeholder="Enter your Password"
                style={styles.txtInput}
                value={this.state.password}
                onChangeText={password =>
                  this.setState({
                    password: password
                  })
                }
              />
            )}
            <TouchableOpacity onPress={() => this.secureTextEntry()}>
              {this.state.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> this.sendCred(this.state)}>
            <View style={styles.button}>
              <LinearGradient
                colors={["#00A79B", "#31BFB5", "#00A79B"]}
                style={styles.SignIn}
              >
                <Text style={styles.txtSign}>Sign In</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <View style={styles.Terms}>
            <Text style={{ color: "grey" }}>Forgot your login details? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Forgot")}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Get help signing in.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.SignUp}>
            <Text style={{ color: "grey" }}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() =>this.props.navigation.navigate("SignUpScreen") }
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 30,
    paddingBottom: 30
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
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "#000"
  },
  txt_Footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 50
  },
  button: {
    marginTop: 50,
    alignItems: "center"
  },
  SignUp: {
    marginTop: 90,
    flexDirection: "row",
    justifyContent: "center"
  },
  SignIn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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
  Terms: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center"
  },
  backgroudImage: {
    position: "absolute",
    top: 60,
    right: 0,
    bottom: 0,
    left: 190,
    width: "50%",
    opacity: 0.5
  }
});
