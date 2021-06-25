import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {

  const [err, setErr] = useState(null);

  // WARNING:
  // brackets with a value (as second param), force executed each time the value change, but the function executed is always the same, with the same state references (not updated with the new one)
  // see https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15708974#overview
  // & https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15708978#overview

  useEffect(() => {

    let subscriber;

    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        // setErr(null);
        const subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        }, callback);
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
        if(subscriber) subscriber.remove();
        subscriber = null;
      }

    return () => {
      if(subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);  

  return [err];
}