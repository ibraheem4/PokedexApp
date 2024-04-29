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

const getNumColumns = () => {
  const width = Dimensions.get("window").width;
  if (width > 1200) {
    return 5;
  } else if (width > 900) {
    return 4;
  } else if (width > 600) {
    return 3;
  } else if (width > 400) {
    return 2;
  } else {
    return 1;
  }
};

const HomeScreen = ({ navigation }) => {
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
    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, [numColumns]);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const newPokemons = await fetchPokemons(offset);
        if (newPokemons) {
          setPokemons((prev) => [...prev, ...newPokemons]);
        } else {
          setError("Failed to fetch pokemons");
        }
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
        <View style={[styles.card, { width: `${100 / numColumns}%` }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { pokemon: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
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
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
