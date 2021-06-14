import "react-native-gesture-handler";
import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "../util/AppContext";
import { InnerHome } from "./InnerHome";
import Login from "./Login";
import Header from "../components/Header";
import colors from "../config/colors";
import Register from "./Register";

const Stack = createStackNavigator();

const screenNames = {
  home: "Home",
  login: "Login",
  register: "Register",
};

const styles = StyleSheet.create({
  headerAuthContainer: {
    flex: 0,
    backgroundColor: colors.headerColor,
  },
  headerContainer: {
    flex: 0,
    backgroundColor: colors.greyColor,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: colors.greyColor,
  },
});

export const Home = () => {
  const { setTrackItInfo, auth } = useContext(AppContext);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const trackItData = await AsyncStorage.getItem("trackItData");
        if (trackItData !== null) {
          const trackItDataParsed = JSON.parse(trackItData);
          setTrackItInfo(trackItDataParsed);
        } else {
          await AsyncStorage.setItem("trackItData", JSON.stringify([]));
          setTrackItInfo([]);
        }
      } catch (e) {
        alert("Something went wrong. Please try again.");
      }
    };
    fetchAppData();
  }, []);
  return (
    <>
      <SafeAreaView
        style={auth ? styles.headerAuthContainer : styles.headerContainer}
      />
      <SafeAreaView style={styles.footerContainer}>
        <NavigationContainer>
          {auth ? (
            <Stack.Navigator
              initialRouteName={screenNames.home}
              screenOptions={{
                header: (props) => <Header {...props} />,
              }}
            >
              <Stack.Screen name={screenNames.home} component={InnerHome} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName={screenNames.login}>
              <Stack.Screen
                name={screenNames.login}
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={screenNames.register}
                component={Register}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};
