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
import { HomeScreenProps } from "../types";
import ImageColors from "react-native-image-colors";

const getNumColumns = () => {
  const width = Dimensions.get("window").width;
  if (width > 1200) {
    return 4;
  } else if (width > 900) {
    return 3;
  } else if (width > 600) {
    return 2;
  } else {
    return 1;
  }
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numColumns, setNumColumns] = useState(getNumColumns());

  useEffect(() => {
    const onChange = () => {
      const newColumns = getNumColumns();
      if (newColumns !== numColumns) {
        setNumColumns(newColumns);
      }
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription.remove();
  }, [numColumns]);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const newPokemons = await fetchPokemons(offset);
        const pokemonWithColors = await Promise.all(
          newPokemons.map(async (pokemon) => {
            const colors = await ImageColors.getColors(pokemon.image, {
              fallback: "#FFFFFF",
            });
            return { ...pokemon, bgColor: colors.muted || "#FFFFFF" };
          })
        );
        setPokemons((prev) => [...prev, ...pokemonWithColors]);
      } catch (error) {
        console.error("Failed to load pokemons:", error);
        setError("Error loading pokemons");
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [offset]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            { backgroundColor: item.bgColor, width: `${100 / numColumns}%` },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { pokemon: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.id}>{item.id.toString().padStart(3, "0")}</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.name}
      numColumns={numColumns}
      onEndReached={() => setOffset(offset + 20)}
      onEndReachedThreshold={0.5}
      key={numColumns} // Ensure re-rendering by using numColumns as key
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  id: {
    fontSize: 14,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
