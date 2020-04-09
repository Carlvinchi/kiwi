import React from "react";

import {
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation-drawer";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground
} from "react-native";
import { IMAGE } from "../constants/Image";

import {
  Home,
  SignIn,
  SignUp,
  Account,
  Search,
  AddProduct,
  About,
  Settings
} from "../Screens";

import { LinearGradient } from "expo-linear-gradient";

const CustomDrawerContentComponent = props => (
  <LinearGradient style={{ flex: 1 }} colors={["#FFF", "green"]}>
    <ScrollView>
      <ImageBackground
        source={IMAGE.SignUpLogo}
        style={{ width: undefined, padding: 16, paddingTop: 48 }}
      >
        <Image source={IMAGE.avatar} style={StyleSheet.profile} />
        <Text style={styles.name}>Kiwi Users</Text>
      </ImageBackground>
      <View>
        <DrawerItems {...props} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Hey !",
              "Are you Sure you want to Logout ?",
              [
                { text: "Yes", onPress: () => console.log("Yes Pressed") },
                { text: "No", onPress: () => console.log("No Pressed") }
              ],
              { cancelable: false }
            )
          }
        >
          <Text style={{ color: "white", marginTop: 20, paddingLeft: 80 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </LinearGradient>
);

const MainStack = createDrawerNavigator(
  {
    HomeScreen: {
      screen: Home,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="home" size={20} color={tintColor} />
        )
      }
    },
    AccountScreen: {
      screen: Account,
      navigationOptions: {
        title: "Account",
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={20} color={tintColor} />
        )
      }
    },
    AdvSearchScreen: {
      screen: Search,
      navigationOptions: {
        title: "Advanced Search",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-search" size={20} color={tintColor} />
        )
      }
    },
    SignInScreen: {
      screen: SignIn,
      navigationOptions: {
        title: "Sign In",
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="sign-in" size={20} color={tintColor} />
        )
      }
    },
    SignUpScreen: {
      screen: SignUp,
      navigationOptions: {
        title: "Sign Up",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="adduser" size={20} color={tintColor} />
        )
      }
    },
    ProductScreen: {
      screen: AddProduct,
      navigationOptions: {
        title: "Add Products/Services",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="shoppingcart" size={20} color={tintColor} />
        )
      }
    },
    AboutScreen: {
      screen: About,
      navigationOptions: {
        title: "About",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="questioncircle" size={20} color={tintColor} />
        )
      }
    },

    SettingsScreen: {
      screen: Settings,
      navigationOptions: {
        title: "Settings",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="tool" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "HomeScreen",
    drawerPosition: "left",
    contentComponent: CustomDrawerContentComponent,
    //Getting the dimension to fit on every device
    drawerWidth: Dimensions.get("window").width * 0.75,
    hideStatusBar: true,
    contentOptions: {
      activeBackgroundColor: "#93FFBF",
      activeTintColor: "blue",
      itemsContainerStyle: {
        marginTop: 10,
        marginHorizontal: 5
      },
      itemStyle: {
        borderRadius: 10
      }
    }
  }
);

const DrawerNavigator = createDrawerNavigator({
  drawer: {
    screen: MainStack
  }
});

const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF"
  },
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8
  }
});

export default DrawerNavigator;
