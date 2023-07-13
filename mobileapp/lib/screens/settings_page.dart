import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: RectangleButton(title: 'SE DECONNECTER', onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const WelcomeScreen()),
          );
        }, color: Colors.red,
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
