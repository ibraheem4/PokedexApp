import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { DetailsScreenProps } from "../types";

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Name: {pokemon.name}</Text>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.section}>Type: {pokemon.types.join(", ")}</Text>

        <Text style={styles.section}>Abilities:</Text>
        {pokemon.abilities.map((ability, index) => (
          <Text key={index} style={styles.details}>
            {ability.ability.name} (Hidden: {ability.is_hidden ? "Yes" : "No"})
          </Text>
        ))}

        <Text style={styles.section}>Stats:</Text>
        {pokemon.stats.map((stat, index) => (
          <Text key={index} style={styles.details}>
            {stat.stat.name}: {stat.base_stat}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailsScreen;
