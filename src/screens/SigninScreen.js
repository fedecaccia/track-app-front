import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  // console.log(state);
  
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage}
        // onDidFocus={()=>{}}
        onWillBlur={clearErrorMessage}
        // onDidBlur={()=>{}}
      />
      <AuthForm
      headerText = "Sign In Tracker"
      errorMessage={state.errorMessage}
      submitButtonText="Sign In"
      onSubmit={({ email, password })=>signin({ email, password })}
      />
      <NavLink text="Don't have an account? Sign up instead" routeName="Signup"/>
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

SigninScreen.navigationOptions = () => ({
  headerShown: false,
});

export default SigninScreen;


{/* <NavigationEvents onWillFocus={clearErrorMessage} */}