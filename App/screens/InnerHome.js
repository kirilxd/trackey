import React, { useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import colors from "../config/colors";
import Card from "../components/Card";
import ListItems from "../components/ListItems";
import Footer from "../components/Footer";
import { AppContext } from "../util/AppContext";

const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    marginLeft: "43%",
    bottom: 5,
  },
  viewStyle: {
    backgroundColor: colors.greyColor,
    height: "100%",
  },
});

export const InnerHome = () => {
  const { setAuth } = useContext(AppContext);
  return (
    <View style={styles.viewStyle}>
      <Card />
      <ListItems />
    </View>
  );
};
