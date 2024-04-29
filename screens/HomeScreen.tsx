import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { fetchPokemons } from "../services/pokemonService";
import { Pokemon, HomeScreenProps } from "../types";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemons(offset);
      setPokemons((prev) => [...prev, ...newPokemons]);
      setLoading(false);
    };
    loadPokemons();
  }, [offset]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      onEndReached={() => setOffset(offset + 20)}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { pokemon: item })}
        >
          <Text>{item.name}</Text>
          <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
