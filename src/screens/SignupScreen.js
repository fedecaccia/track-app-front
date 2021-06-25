import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage}
        // onDidFocus={()=>{}}
        onWillBlur={clearErrorMessage}
        // onDidBlur={()=>{}}
      />
      <AuthForm
      headerText = "Sign Up for Tracker"
      errorMessage={state.errorMessage}
      submitButtonText="Sign Up"
      onSubmit={({ email, password })=>signup({ email, password })}
      />
      <NavLink text="Already have an account? Sign in instead" routeName="Signin"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 10,
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});

SignupScreen.navigationOptions = () => ({
  headerShown: false,
});

export default SignupScreen;
