import React, { useContext } from "react";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../util/AppContext";
import colors from "../config/colors";

const Profile = () => {
  const { setAuth } = useContext(AppContext);
  return (
    <View style={styles.wrapper}>
      <View style={styles.flexWrapper}>
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                "https://i.pinimg.com/originals/f4/9f/6d/f49f6d616de4c2ca93ecbed9fe27215e.jpg",
            }}
          />
        </View>
        <View style={styles.headerWrapper}>
          <Text style={{ fontSize: 40 }}>Name Surname</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => setAuth(false)}
          title="Logout"
          style={styles.logoutButton}
        >
          <Text style={{ color: colors.white }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: colors.greyColor,
  },
  flexWrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
  avatarWrapper: {
    flex: 1,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  headerWrapper: {
    flex: 1,
    alignSelf: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 70,
    borderRadius: 15,
  },
});

export default Profile;
