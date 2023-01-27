import 'package:flutter/material.dart';
import './add_sensors.dart';
import 'package:mobileapp/widgets/footer_menu.dart';
import './Login.dart';
import '../models/rouded_button.dart';
import '../models/constants.dart';
import '../screens/register.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = 'welcome_screen';

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                Container(
                  child: Image.asset('assets/images/logo.png'),
                  height: 145.0,

                ),
              ],
            ),
            SizedBox(
              height: 48.0,
            ),
            RoudedButton(
              title: 'Log In',
              onPressed: () {
                Navigator.pushNamed(context, Login.id);
              },
            ),
            RoudedButton(
              title: 'Register',
              onPressed: () {
                Navigator.pushNamed(context, Register.id);
              },
            ),
          ],
        ),
      ),
    );
  }
}