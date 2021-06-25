import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackFrom from "../components/TrackFrom";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {

  const { state: { recording }, addLocation } = useContext(LocationContext);
  const callback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording]);
  // generic, for each project wer need to track location, and a callback (in this case add location, just return the possible error)
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <Text h2>Create a Track</Text>
      <Map/>
      {err? <Text>Please enable location services</Text>: null}
      <TrackFrom/>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = () => ({
  title: "Add Track",
  tabBarIcon: <FontAwesome nome="plus" size={20} />
});

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);