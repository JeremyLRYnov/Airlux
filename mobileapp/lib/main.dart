import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';
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
          ? const FooterMenu()
          : const WelcomeScreen(),
    ),
  );
}

Future<bool> isTokenValid(String token) async {
  try{
    final response = await http.get(Uri.parse('http://10.0.2.2:6869/building'),
    headers: {'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $token',}
    );
    if(response.statusCode == 200) {
      return true;
    }
    else
      {
        return false;
      }
  }
  catch (error)
  {
    print(error);
    return false;
  }
}