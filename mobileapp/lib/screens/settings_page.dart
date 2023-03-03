import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';

class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => WelcomeScreen()),
            );
          },
          child: Text('Se déconnecter', style: TextStyle(fontSize: 20)),
          style: ElevatedButton.styleFrom(
            primary: Colors.red, // Couleur du bouton
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0), // Bordure arrondie
            ),
            padding: EdgeInsets.symmetric(
                horizontal: 50, vertical: 15), // Espacement intérieur
          ),
        ),
      ),
    );
  }
}
