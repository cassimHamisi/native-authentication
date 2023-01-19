import { createContext, useState } from "react";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [tokenVar, setTokenVar] = useState("");

  const authenticate = async (token) => {
    setTokenVar(token);
    await AsyncStorage.setItem("token", token);
  };
  const logout = async () => {
    setTokenVar(undefined);
    await AsyncStorage.removeItem("token");
  };

  const value = {
    token: tokenVar,
    isAuthenticated: !!tokenVar,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
