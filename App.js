import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";

export default function App() {
  const LOGO_WIDTH = 130;
  const LOGO_HEIGHT = 155;
  const LOGO_WIDTH_SMALL = 55;
  const LOGO_HEIGHT_SMALL = 65;

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(
    new Animated.ValueXY({ x: LOGO_WIDTH, y: LOGO_HEIGHT })
  );

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }, []);

  const setLogoSize = (x, y, t) => {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: x,
        duration: t,
      }),
      Animated.timing(logo.y, {
        toValue: y,
        duration: t,
      }),
    ]).start();
  };

  const keyboardDidShow = () => {
    setLogoSize(LOGO_WIDTH_SMALL, LOGO_HEIGHT_SMALL, 50);
  };

  const keyboardDidHide = () => {
    setLogoSize(LOGO_WIDTH, LOGO_HEIGHT, 50);
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          source={require("./assets/logo.png")}
          style={{ width: logo.x, height: logo.y }}
        />
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.txtSubmit}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.txtRegister}>Create free account</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 50,
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: "#35aaff",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  txtSubmit: {
    color: "#fff",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  txtRegister: {
    color: "#fff",
  },
});
