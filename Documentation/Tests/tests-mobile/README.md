![Logo](https://pcdt.fr/images/pd/brand/airlux.svg)


# AirLux

AirLux est une application de domotique avec une architecture complète permettant
à un utilisateur de se connecter, gérer ses appareils et accéder aux différentes
données liées à la température ou à l'humidité par exemple.



## Authors

- [@AlexisB](https://www.github.com/alexibrouard)
- [@JeremyLR](https://github.com/JeremyLRYnov)
- [@JérémyG](https://github.com/Zetsuy)
- [@EnzoP](https://github.com/DaoGod)
- [@NicolasS](https://github.com/Nicolas-3050)


# Tests d'intégration Flutter

## Installation

Pour pouvoir réaliser des tests d'intégration sur Flutter il faut tout d'abord modifier le fichier `pubspec.yaml` en ajoutant les lignes suivantes :

```
dev_dependencies:
  integration_test:
    sdk: flutter
  flutter_test:
    sdk: flutter
```

puis faire un `pub get`.

Il faut ensuite créer un dossier `integration_test` et ajouter un fichier nommé `<name>_test.dart` (exemple : `app_test.dart`).


## Example de test

```
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
    testWidgets('failing test example', (tester) async {
    expect(2 + 2, equals(5));
  });
}
```

## Lancement des tests

Pour lancer les tests il faut utiliser la commande `flutter test integration_test` dans le terminal.



