import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';
import 'package:mobileapp/screens/buildings_page.dart';
import 'package:mobileapp/screens/appairage_page.dart';
import 'package:mobileapp/screens/sensors_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/constants.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FractionallySizedBox(
              widthFactor: 0.9,
              child: RectangleButton(
                  title: 'GERER VOS BATIMENTS',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => BuildingListPage()),
                    );
                  },
                  color: kPrimaryBlue),
            ),
            SizedBox(
              height: 40.0,
            ),
            FractionallySizedBox(
              widthFactor: 0.9,
              child: RectangleButton(
                  title: 'APPAIRER VOTRE BOX',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => AppairagePage()),
                    );
                  },
                  color: kPrimaryBlue),
            ),
            SizedBox(
              height: 40.0,
            ),
            FractionallySizedBox(
              widthFactor: 0.9,
              child: RectangleButton(
                  title: 'AJOUTER DES APPAREILS',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => Sensors()),
                    );
                  },
                  color: kPrimaryBlue),
            ),
            SizedBox(
              height: 40.0,
            ),
            FractionallySizedBox(
              widthFactor: 0.7,
              child: RectangleButton(
                title: 'SE DECONNECTER',
                onPressed: () async {
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setString('token', '');
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const WelcomeScreen()),
                  );
                },
                color: Colors.red,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RectangleButton extends StatelessWidget {
  const RectangleButton({
    Key? key,
    required this.title,
    required this.onPressed,
    required this.color,
  }) : super(key: key);

  final String title;
  final Color color;
  final void Function() onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: color, // Couleur du bouton
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0), // Bordure arrondie
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: 50,
          vertical: 15,
        ), // Espacement intérieur
      ),
      child: Text(title, style: const TextStyle(fontSize: 20)),
    );
  }
}
