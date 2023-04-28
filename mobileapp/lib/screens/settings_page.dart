import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const WelcomeScreen()),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red, // Couleur du bouton
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0), // Bordure arrondie
            ),
            padding: const EdgeInsets.symmetric(
                horizontal: 50, vertical: 15,), // Espacement intérieur
          ),
          child: const Text('Se déconnecter', style: TextStyle(fontSize: 20)),
        ),
      ),
    );
  }
}
