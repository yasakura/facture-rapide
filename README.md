# Instructions

## Build avec Xcode sur l'iPhone

Après avoir jouer le script npm run build-for-xcode, ouvrir Xcode et Go to File -> Workspace Settings, and make sure your build system is set to Legacy Build System.

Décocher :

- Ipad
- Landscape Left
- Landscape Right

Dans l'onglet « Signing & Capabilities », pour le Debug et la Release décocher « Automatically manage signing »

Pour le Debug re-cocher « Automatically manage signing » et choisir la Team

## Pour mettre sur l'Apple store

A l'endroit où on choisi le device à builder, choisir « Generic IOS Device », ensuite dans le menu Product > Archive

Sur la fenetre d'après, cliquer sur « Validate App »

Une fois valider, cliquer sur « Distribute App »
