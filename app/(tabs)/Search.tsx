import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [city, setCity] = useState("");
  const [showCityModal, setShowCityModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("All");
  const [filters, setFilters] = useState({
    offers: false,
    homeService: false,
    topRated: false,
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const categories = [
    "All",
    "Barber",
    "Nails",
    "Hair",
    "Spa",
    "Massage",
    "Makeup",
  ];
  const cities = ["Tunis", "Sousse", "Sfax", "Nabeul", "Bizerte", "Monastir"];

  const handleSearch = () => {
    // Mock data
    const mockResults = [
      {
        id: "1",
        name: "Barber Shop Deluxe",
        category: "Barber",
        city: "Tunis",
      },
      { id: "2", name: "Glamour Nails", category: "Nails", city: "Sousse" },
      { id: "3", name: "Relax Spa", category: "Spa", city: "Nabeul" },
      { id: "4", name: "Modern Cuts", category: "Barber", city: "Sfax" },
    ];

    const filtered = mockResults.filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (city === "" || item.city === city) &&
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const ResultCard = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
      onPress={() => router.push({
        pathname: '/(salon)/SalonScreen',
        params: {
          id: item.id,
          name: item.name,
        }
      })}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-lg mr-4"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-lg font-semibold text-gray-900 flex-1 mr-2">
              {item.name}
            </Text>
            <View className={`px-2 py-1 rounded-full ${
              item.isOpen ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Text className={`text-xs font-medium ${
                item.isOpen ? 'text-green-800' : 'text-red-800'
              }`}>
                {item.isOpen ? 'OPEN' : 'CLOSED'}
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-600 text-sm mb-2">
            {item.category} • {item.distance} • {item.priceRange}
          </Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-gray-700 text-sm font-medium ml-1 mr-2">
                {item.rating}
              </Text>
              <Text className="text-gray-500 text-sm">
                ({item.reviews})
              </Text>
            </View>
            
            <View className="flex-row items-center space-x-2">
              {item.offers && (
                <View className="bg-blue-100 px-2 py-1 rounded-full">
                  <Text className="text-blue-800 text-xs font-medium">Offers</Text>
                </View>
              )}
              {item.homeService && (
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-800 text-xs font-medium">Home</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Text style={styles.header}>Find your next appointment ✂️</Text>

          {/* City Selector */}
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowCityModal(true)}
          >
            <Text style={styles.inputLabel}>
              {city ? `📍 ${city}` : "Select City"}
            </Text>
          </TouchableOpacity>

          {/* Date Selector */}
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputLabel}>📅 {date.toDateString()}</Text>
          </TouchableOpacity>

          {/* Search Bar */}
          <TextInput
            placeholder="Search for a salon or service..."
            value={query}
            onChangeText={setQuery}
            style={styles.searchBar}
          />

          {/* Category Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.activeCategory,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.activeCategoryText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Filter Buttons */}
          <View style={styles.filtersRow}>
            {Object.keys(filters).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.filterBtn,
                  filters[key] && styles.activeFilterBtn,
                ]}
                onPress={() =>
                  setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    filters[key] && styles.activeFilterText,
                  ]}
                >
                  {key === "offers"
                    ? "✨ Special Offers"
                    : key === "homeService"
                    ? "🏠 Home Services"
                    : "⭐ Top Rated"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>

          {/* Results */}
          {results.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Results</Text>
              {results.map((item) => (
                <View key={item.id} style={styles.resultCard}>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultDetails}>
                    {item.category} • {item.city}
                  </Text>
                </View>
              ))}
            </>
          )}

          {results.length === 0 && (
            <Text style={styles.emptyText}>Search to see results 🔍</Text>
          )}
        </ScrollView>

        {/* City Modal */}
        <Modal visible={showCityModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Select City</Text>
              <FlatList
                data={cities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.cityItem}
                    onPress={() => {
                      setCity(item);
                      setShowCityModal(false);
                    }}
                  >
                    <Text style={styles.cityText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeModal}
                onPress={() => setShowCityModal(false)}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  inputLabel: { fontSize: 16, color: "#444" },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },
  categories: { marginBottom: 10 },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategory: { backgroundColor: "#222" },
  categoryText: { color: "#333", fontWeight: "500" },
  activeCategoryText: { color: "#fff" },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  filterBtn: {
    width: "48%",
    marginVertical: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
  },
  activeFilterBtn: { backgroundColor: "#222", borderColor: "#222" },
  filterText: { color: "#333", fontWeight: "500", textAlign: "center" },
  activeFilterText: { color: "#fff" },
  searchBtn: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  searchBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 15,
    color: "#222",
  },
  resultCard: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  resultName: { fontSize: 16, fontWeight: "600", color: "#222" },
  resultDetails: { color: "gray", marginTop: 4 },
  emptyText: { textAlign: "center", color: "gray", marginTop: 40 },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
  },
  cityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cityText: { fontSize: 16, color: "#333" },
  closeModal: {
    backgroundColor: "#000",
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
