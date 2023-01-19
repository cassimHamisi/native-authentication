import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // calls a send Request function from auth
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      setIsAuthenticated(false);
    } catch (error) {
      Alert.alert(
        "Authentication Error",
        "You have enterred invalid Credentials, Not authenticated!!!"
      );
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
