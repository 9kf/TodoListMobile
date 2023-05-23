import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useListStore } from "./store";
import { useState } from "react";

const Item = ({ item, index }) => {
  const removeItem = useListStore((state) => state.removeItem);
  const updateItem = useListStore((state) => state.updateItem);

  const [updatedName, setUpdatedName] = useState("");
  return (
    <View key={index} style={styles.rowContainer}>
      <Text>{item}</Text>
      <Button title="Remove" onPress={() => removeItem(index)} />
      <TextInput
        placeholder="Update name"
        value={updatedName}
        onChangeText={(val) => setUpdatedName(val)}
      />
      <Button title="Update" onPress={() => updateItem(index, updatedName)} />
    </View>
  );
};

export default function App() {
  const items = useListStore((state) => state.items);
  const addItem = useListStore((state) => state.addItem);
  const searchItem = useListStore((state) => state.searchItem);

  const [itemName, setItemName] = useState("");
  const [searchvalue, setSearchValue] = useState("");
  const [searchedItem, setSearchedItem] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.rowContainer, marginBottom: 24 }}>
        <TextInput
          placeholder="Search item"
          value={searchvalue}
          onChangeText={(val) => setSearchValue(val)}
        />
        <Button
          title="Search"
          onPress={(e) => {
            setSearchedItem(searchItem(searchvalue));
          }}
        />
        {searchedItem && <Text>{searchedItem}</Text>}
      </View>
      <Text>Items</Text>
      {items.length === 0 && <Text>No Items</Text>}
      {items.map((item, index) => (
        <Item key={index} item={item} index={index} />
      ))}
      <View style={{ ...styles.rowContainer, marginTop: 24 }}>
        <TextInput
          placeholder="Item name"
          value={itemName}
          onChangeText={(val) => setItemName(val)}
        />
        <Button
          title="Add"
          onPress={(e) => {
            addItem(itemName);
            setItemName("");
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  rowContainer: {
    flexDirection: "row",
  },
});
