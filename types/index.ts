export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonStat {
  stat: {
    name: string;
    url: string;
  };
  base_stat: number;
}

export interface PokemonGameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  game_indices: PokemonGameIndex[];
}

export interface DetailsScreenProps {
  route: {
    params: {
      pokemon: Pokemon;
    };
  };
}

export interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params: { pokemon: Pokemon }) => void;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Details: {
    pokemon: Pokemon;
  };
};
