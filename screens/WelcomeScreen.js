import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        "https://expensetracker-native-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setMessage(response.data);
      });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>Your are authenticated successfully!🎁🎁🎁</Text>
      <Text>{message}🥳🥳🥳</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
