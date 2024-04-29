import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { fetchPokemons } from "../services/pokemonService";
import { HomeScreenProps, Pokemon } from "../types";

const screenWidth = Dimensions.get("window").width;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemons(offset);
      setPokemons((prev) => [...prev, ...newPokemons]);
      setLoading(false);
    };
    loadPokemons();
  }, [offset]);

  if (loading && pokemons.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const numColumns = 3;
  const size = screenWidth / numColumns;

  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { width: size, height: size }]}
          onPress={() => navigation.navigate("Details", { pokemon: item })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => `${item.id}`}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      onEndReached={() => {
        if (!loading) {
          setOffset(pokemons.length);
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        loading ? <ActivityIndicator size="small" color="#0000ff" /> : null
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // Android
    shadowOpacity: 0.1, // iOS
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  image: {
    width: "80%",
    height: "70%",
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomeScreen;
