import { useAuth } from "@/context/AuthContext";
import { Button, View, Text, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";

const Page = () => {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const response = await fetch("/api/todos", {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    setTodos(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>List</Text>
      <Link href="/(authenticated)/(drawer)/(tabs)/list/42" asChild>
        <Button title="Go to 42" />
      </Link>
      <Link href="/(authenticated)/(drawer)/(tabs)/list/53?query=Paulo" asChild>
        <Button title="Go to 53" />
      </Link>
      <Link href="/(authenticated)/details/99?query=From_Outside" asChild>
        <Button title="Go to 99" />
      </Link>
      <FlatList
        data={todos}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }) => (
          <Link
            href={`/(authenticated)/(drawer)/(tabs)/list/${item._id}`}
            asChild
          >
            <Pressable style={{ padding: 10, height: 44 }}>
              <Text>{item.task}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default Page;
