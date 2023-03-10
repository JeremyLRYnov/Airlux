import 'package:flutter/material.dart';
import './Login.dart';
import 'package:mobileapp/widgets/rounded_button.dart';
import '../screens/register.dart';
import 'package:mobileapp/models/constants.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = 'welcome_screen';

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
                'Vous ne pouvez pas faire de Retour Arrière sur cette page.'),
            backgroundColor: Colors.red,
          ),
        );
        return false;
      },
      child: Scaffold(
        backgroundColor: Colors.white,
        body: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                flex: 6,
                  child: Container(
                    child: Image.asset('assets/images/logo.png'),
                    height: 145.0,
                  ),
              ),
              Expanded(
                flex: 3,
                  child: Column(
                    children: [
                      RoundedButton(title: "CONNEXION", color: kPrimaryBlue, onPressed: (){Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => Login()),
                      );}),
                      Container(margin: EdgeInsets.all(20)),
                      RoundedButton(title: "INSCRIPTION", color: kPrimaryButtonInactive, onPressed: (){Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => Register()),
                      );}),
                ],
              ))
            ],
          ),
        ),
      ),
    );
  }
}
