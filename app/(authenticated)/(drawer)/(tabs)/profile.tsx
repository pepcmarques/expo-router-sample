import { View, Button } from "react-native";

const Page = () => {
  async function fetchhello() {
    const response = await fetch("/api/hello");
    const data = await response.json();
    alert("Hello " + data.hello);
  }
  return (
    <View>
      <Button onPress={() => fetchhello()} title="Fetch Hello"></Button>
    </View>
  );
};

export default Page;
