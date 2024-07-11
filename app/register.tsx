import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { onRegister } = useAuth();

  const register = async () => {
    setLoading(true);

    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      router.back(); // push('/');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />
      <TextInput
        autoCapitalize="none"
        placeHolder="john@doe.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
        placeHolderTextColor={"#fff"}
      />
      <TextInput
        placeHolder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
        placeHolderTextColor={"#fff"}
      />

      <Pressable onPress={register} style={styles.button}>
        <Text style={styles.text}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  inputField: {
    marginVertical: 4,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: Colors.tint,
    borderRadius: 4,
    padding: 10,
    color: "#fff",
    backgroundColor: Colors.background,
  },
  button: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ACE",
    padding: 12,
    borderRadius: 4,
  },
  outlineButton: {
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.tint,
  },
  text: {
    color: "#fff",
  },
});
