import 'package:flutter/material.dart';
import 'package:mobileapp/widgets/rounded_button.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';

class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: RoundedButton(
          title: 'SE DECONNECTER', color: Colors.red, onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => WelcomeScreen()),
          );
        },
        )
      ),
    );
  }
}
