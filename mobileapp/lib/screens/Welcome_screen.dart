import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Login.dart';
import 'package:mobileapp/screens/register.dart';
import 'package:mobileapp/screens/settings_page.dart';
import 'package:mobileapp/widgets/rouded_button.dart';

import '../models/constants.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = 'welcome_screen';

  const WelcomeScreen({super.key});

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(

          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
              Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                Expanded(
                  child: SizedBox(
                    height: 200.0,
                    child: Image.asset('assets/images/logo.png'),

                  ),
                ),
              ],
            ),
            const SizedBox(
              height: 48.0,
            ),
            RectangleButton(
              title: 'CONNEXION',
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Login()),
                );
              }, color: kPrimaryBlue,
            ),
            const SizedBox(
              height: 24.0,
            ),
            RectangleButton(
              title: 'INSCRIPTION',
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Register()),
                );
              }, color: kPrimaryBlue,
            ),
          ],
        ),
      ),
    );
  }
}