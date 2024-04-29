# Pokedex App

This React Native app serves as a Pokedex, fetching data from the [PokéAPI](https://pokeapi.co) to display [Pokémon](https://www.pokemon.com/us/pokedex) and their details, including images and types. It features a home screen with an infinite scroll list of Pokémon and a detail screen for each Pokémon.

## Initial Project Setup

Create a new React Native project using the following command:

```
npx react-native init PokedexApp --template react-native-template-typescript
```

## Initial Repository Setup

Create and push to a private GitHub repository using the following commands:

```
git init && mygit && git branch -M main && gh repo create --private --source=. --remote=upstream && gh repo set-default && git add --all && git commit -m "Initial commit" && git remote add origin git@github.com:ibraheem4/PokedexApp.git && git push -u origin main && gh browse
```

## Setup

1. Clone the repository:

```
git clone git@github.com:ibraheem4/PokedexApp.git
```

2. Install dependencies:

```
yarn install
```

3. Start the application:

Choose the appropriate command based on your target platform from the usage section below.

## Usage

Navigate to the directory and run one of the following yarn commands based on your target platform:

```
cd PokedexApp
yarn android  # for Android
yarn ios      # for iOS
yarn web      # for web
```

## Features

- **Infinite Scrolling List**: Browse through a list of Pokémon that loads more as you scroll.
- **Pokémon Details**: Click on any Pokémon to view more detailed information including its image and types.
- **Images and Types**: Each Pokémon's image and types are displayed on both the home screen and detail screen.
