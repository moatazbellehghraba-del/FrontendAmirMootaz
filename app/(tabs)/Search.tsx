import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const mockData = [
  { id: "1", name: "Barber Shop Deluxe", category: "Barber" },
  { id: "2", name: "Glamour Nails", category: "Nails" },
  { id: "3", name: "Relax Spa", category: "Spa" },
  { id: "4", name: "Modern Cuts", category: "Barber" },
];
const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(mockData);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setFilteredData(mockData);
    } else {
      setFilteredData(
        mockData.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search salons or services..."
        value={query}
        onChangeText={handleSearch}
      />

      {/* 📋 Results */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem}>
            <Text style={styles.resultText}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No results found</Text>}
      />
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchBar: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "600",
  },
  category: {
    fontSize: 14,
    color: "gray",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
