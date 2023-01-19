import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { createNewUser } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";

function SignupScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  // calls a send Request function from auth
  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticated(true);
    try {
      const token = await createNewUser(email, password);
      authCtx.authenticate(token);
      setIsAuthenticated(false);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not sign in The user, Please Try again Later"
      );
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
