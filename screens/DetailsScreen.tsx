import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { DetailsScreenProps } from "../types";

const initialLayout = { width: Dimensions.get("window").width };

const AboutTab = ({ pokemon }) => (
  <View style={styles.tabContainer}>
    <Text style={styles.details}>
      Base Experience: {pokemon.base_experience}
    </Text>
    <Text style={styles.details}>Height: {pokemon.height}</Text>
    <Text style={styles.details}>Weight: {pokemon.weight}</Text>
  </View>
);

const StatsTab = ({ pokemon }) => (
  <View style={styles.tabContainer}>
    {pokemon.stats.map((stat, index) => (
      <Text key={index} style={styles.details}>
        {stat.stat.name}: {stat.base_stat}
      </Text>
    ))}
  </View>
);

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { pokemon } = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "about", title: "About" },
    { key: "stats", title: "Stats" },
  ]);

  const renderScene = SceneMap({
    about: () => <AboutTab pokemon={pokemon} />,
    stats: () => <StatsTab pokemon={pokemon} />,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {pokemon.name}</Text>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.section}>Type: {pokemon.types.join(", ")}</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabView}
        renderTabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabView: {
    width: "100%",
  },
  tabContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  tabBar: {
    backgroundColor: "#f0f0f0",
  },
});

export default DetailsScreen;
