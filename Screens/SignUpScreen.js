import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  CheckBox,
  Image,
  AsyncStorage
} from "react-native";
import * as Animated from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import {validateAll} from 'indicative/validator';
//exp://127.0.0.1:19000

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      validationErrors:{}
    };
  }

  textInputChange(value) {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true,
        
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
  //const {Email,Username,password} = this.state;
  senCred =  async(data)=>{
                const rules = {
                  Email: 'required|email',
                  Username: 'required|string',
                  password: 'required|string|min:6'
                }
                const messages = {
                  required: (field)=>`${field} is required`,
                  'email.email': 'The email syntax is wrong',
                  'password.min': 'Password is short'
                }
              
          try {
                  await validateAll(data, rules,messages)


            fetch("http://192.168.42.114:3000/signup", {
              method:"POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                //  firstName:firstname,
                 // lastName:lastName,
                  email:data.Email,
                //  mobileNumber:mobileNumber,
                //  university:university,
                 // address_1:address_1,
                 // address_2:address_2,
                  userName:data.Username,
                  //profileImage:profileImage,
                  password:data.password
        
              })
        
            }) 
              .then(res=>res.json())
              .then(async (data)=>{
                console.log(data);
                
                  await AsyncStorage.setItem('token', data.token);
                  console.log("Your registred");
                  this.props.navigation.navigate("HomeScreen");
                     
              })
          } catch (errors) {
            console.log("this is error",errors.data);
               const formattedErrors = {};
               errors.forEach(error => formattedErrors[error.field] = error.message);
              
               if(Object.getOwnPropertyNames(formattedErrors).length === 0){
                console.log("this is error",errors.data);
               }
               else{
                this.setState({
                  validationErrors: formattedErrors
                })
               }
          }
      }  
    
  

  render() {
    //console.log("----------",this.state.validationErrors)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("HomeScreen")}
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
          <Text style={styles.txt_Header}>Create New Account</Text>
          
        </View>
        <Animated.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.txt_Footer}>Username</Text>
          <View style={styles.action}>
            <AntDesign name="adduser" color="black" size={25} />
            <TextInput
              placeholder="Enter Username"
              style={styles.txtInput}
              value={this.state.userName}
              onChangeText={userName => this.setState({
                Username:userName,
                check_textInputChange:true
              })}
            />

            {this.state.check_textInputChange ? (
              <Animated.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={25} />
              </Animated.View>
            ) : null}

            
          </View>
          {this.state.validationErrors['Username'] && <Text style={{fontSize:25, color:'red'}}>{this.state.validationErrors['Username']}</Text>}
          <Text style={[styles.txt_Footer, { marginTop: 15 }]}>Email</Text>
          <View style={styles.action}>
            <Feather name="mail" color="black" size={25} />
            <TextInput
              placeholder="Enter Email"
              style={styles.txtInput}
              value={this.state.Email}
              onChangeText={Email => this.setState({
                Email:Email,
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

          <Text style={[styles.txt_Footer, { marginTop: 15 }]}>Password</Text>
          <View style={styles.action}>
            <Ionicons name="ios-lock" color="black" size={25} />
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
          <View style={styles.Terms}>
            <CheckBox
              value={this.state.checked}
              onValueChange={() =>
                this.setState({ checked: !this.state.checked })
              }
            />
            <Text style={{ color: "grey", marginTop: 5 }}>
              I have accepted the{" "}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Terms")}
            >
              <Text
                style={{
                  color: "#00A79B",
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Terms}>
            <Text style={{ color: "grey" }}>Already have account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignInScreen")}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Signin.
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> this.senCred(this.state)
          }>
          <View style={styles.button}>
            <LinearGradient
              colors={["#00A79B", "#31BFB5", "#00A79B"]}
              style={styles.SignUp}
            >
              <Text style={styles.txtSign}>Sign Up</Text>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  txt_Footer: {
    color: "#05375a",
    fontSize: 18
  },
  button: {
    marginTop: 50,
    alignItems: "center"
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
  Terms: {
    marginTop: 50,
    flexDirection: "row"
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
