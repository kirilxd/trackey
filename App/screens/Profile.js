import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { AppContext } from "../util/AppContext";

const Profile = () => {
  const { setAuth } = useContext(AppContext);
  return (
    <Button onPress={() => setAuth(false)} title="Logout">
      Logout
    </Button>
  );
};
export default Profile;
