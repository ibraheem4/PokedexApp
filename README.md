## Pokedex App

## Create and push a private repo, adding git credentials

```
git init && mygit && git branch -M main && gh repo create --private --source=. --remote=upstream && gh repo set-default && git add --all && git commit -m "Initial commit" && git remote add origin git@github.com:ibraheem4/PokedexApp.git && git push -u origin main && gh browse
```

## Usage

To run your project, navigate to the directory and run one of the following yarn commands.

```
- cd PokedexApp
- yarn android
- yarn ios
- yarn web
```
