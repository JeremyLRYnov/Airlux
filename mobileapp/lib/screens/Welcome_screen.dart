import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Login.dart';
import 'package:mobileapp/screens/register.dart';
import 'package:mobileapp/widgets/rouded_button.dart';

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

                SizedBox(
                  height: 200.0,
                  child: Image.asset('assets/images/logo.png'),

                ),
              ],
            ),
            const SizedBox(
              height: 48.0,
            ),
            RoudedButton(
              title: 'Log In',
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Login()),
                );
              },
            ),
            RoudedButton(
              title: 'Register',
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Register()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}