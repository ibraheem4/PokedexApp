export interface Pokemon {
  name: string;
  image: string;
  types: string[];
}

export interface DetailsScreenProps {
  route: {
    params: {
      pokemon: Pokemon;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

export interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params: { pokemon: Pokemon }) => void;
  };
}
