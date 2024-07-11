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

const Login = () => {
  const [email, setEmail] = useState("simon@galaxies.dev");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const { onLogin } = useAuth();

  const login = async () => {
    setLoading(true);

    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />
      <Text style={styles.header}>Galaxies</Text>
      <Text style={styles.subHeader}>The app to be.</Text>
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
      {/* <Link href="/(authenticated)/(drawer)/(tabs)/home" asChild>
        <Pressable>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </Link> */}
      <Pressable onPress={login} style={styles.button}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
      <Link href="/register" asChild>
        <Pressable style={styles.outlineButton}>
          <Text style={styles.text}>Create account</Text>
        </Pressable>
      </Link>
      <Link href="/privacy" asChild>
        <Pressable>
          <Text style={styles.text}>Privacy</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;

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
  header: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  subheader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#fff",
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
