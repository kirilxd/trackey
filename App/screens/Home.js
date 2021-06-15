import "react-native-gesture-handler";
import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppContext } from "../util/AppContext";
import { InnerHome } from "./InnerHome";
import Login from "./Login";
import Header from "../components/Header";
import colors from "../config/colors";
import Register from "./Register";
import Profile from "./Profile";
import { Foundation } from "@expo/vector-icons";
import Footer from "../components/Footer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenNames = {
  home: "Home",
  login: "Login",
  register: "Register",
  profile: "Profile",
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    backgroundColor: colors.greyColor,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: colors.greyColor,
  },
  footerAuthContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
      <SafeAreaView style={styles.headerContainer} />
      <SafeAreaView
        style={auth ? styles.footerAuthContainer : styles.footerContainer}
      >
        <NavigationContainer>
          {auth ? (
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: colors.headerColor,
                style: {
                  backgroundColor: "white",
                },
              }}
              initialRouteName={screenNames.home}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "Profile") {
                    iconName = "torso";
                  } else if (route.name === "Home") {
                    iconName = "home";
                  }
                  // You can return any component that you like here!
                  return <Foundation name={iconName} size={40} color={color} />;
                },
              })}
            >
              <Tab.Screen name={screenNames.home} component={InnerHome} />
              <Tab.Screen
                name="add"
                component={InnerHome}
                options={{
                  tabBarButton: (props) => {
                    return <Footer />;
                  },
                }}
              />
              <Tab.Screen name={screenNames.profile} component={Profile} />
            </Tab.Navigator>
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
