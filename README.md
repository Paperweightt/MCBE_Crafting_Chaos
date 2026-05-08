#### BTW

for anyone reading this, i got really lazy on the typings for this so be warned

Crafting Chaos or Recipe Chaos, whatever name, randomizes the recipes in the game

## build instructions

#### setup

```powershell
  npm i
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

#### build

```powershell
  npm run generate
  npm run local-deploy
```

#### auto build

```powershell
  npm run local-deploy -- --watch
```

#### compile

```powershell
   npm run mcaddon
```

## Currently Unsupported Recipes

- tipped arrows
- armor trims
- beds
- bundles?
