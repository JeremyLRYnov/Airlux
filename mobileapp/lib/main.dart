import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';
import 'package:mobileapp/screens/home_page.dart';
import 'package:mobileapp/screens/sensors.dart';
import 'screens/Login.dart';
import 'screens/Welcome_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Home Page',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: WelcomeScreen.id,
      routes: {
        WelcomeScreen.id: (context) => WelcomeScreen(),
        Login.id: (context) => Login(),
        HomePage.id: (context) => HomePage(),
        Sensors.id: (context) => Sensors(),
      }
    );
  }
}
