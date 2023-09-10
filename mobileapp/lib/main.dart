import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';
import 'package:mobileapp/screens/home_page.dart';
import 'package:mobileapp/widgets/footer_menu.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');

  runApp(
    MaterialApp(
      title: 'Home Page',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: token != null && await isTokenValid(token)
          ? const HomePage()
          : const WelcomeScreen(),
    ),
  );
}

Future<bool> isTokenValid(String token) async {
  try{
    final response = await http.get('http://10.0.2.2:6869/building/create' as Uri,
    headers: {'Authorization':'Bearer $token',}
    );
  return true;
  }
  catch (error)
  {
    return false;
  }
}