import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <MaterialIcons
          name="menu"
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
          size={30}
          style={styles.icon}
        />
        <View>
          <Text style={styles.headerText}>KiwiMart</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgreen",
    flexDirection: "row",
    height: "30%",
    top: -180
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  icon: {
    paddingTop: 25,
    position: "absolute",
    left: 10
  }
});

export default withNavigation(Header);
