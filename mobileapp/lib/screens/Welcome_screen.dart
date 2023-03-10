import 'package:flutter/material.dart';
import './Login.dart';
import '../models/rouded_button.dart';
import '../screens/register.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = 'welcome_screen';

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
<<<<<<< HEAD
    return WillPopScope(
      onWillPop: () async {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content:
            Text('Vous ne pouvez pas faire de Retour Arrière sur cette page.'),
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
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                    child: Image.asset('assets/images/logo.png'),
                    height: 145.0,
=======
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(

          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                Container(
                  child: Image.asset('assets/images/logo.png'),
                  height: 200.0,
>>>>>>> ff390bd0226e306c60e8cded0bfc4fe0d9d8d5ad

                  ),
                ],
              ),
              SizedBox(
                height: 48.0,
              ),
              RoudedButton(
                title: 'Log In',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Login()),
                  );
                },
              ),
              RoudedButton(
                title: 'Register',
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Register()),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}