import 'dart:async';

import 'package:flutter/material.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';
import 'package:mobileapp/screens/room_page.dart';
import 'package:mobileapp/widgets/footer_menu.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import 'models/constants.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');

  bool isLocalApiAvailable = false;
  if (await isApiAvailable(localApi)) {
    isLocalApiAvailable = true;
    print("LocalApi");
    api = localApi;
  } else {
    print("distantApi");
    api = distantApi;
  }

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => RoomProvider()),
      ],
      child: MaterialApp(
        title: 'Home Page',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: token != null && await isTokenValid(token)
            ? const FooterMenu()
            : const WelcomeScreen(),
      ),
    ),
  );
}

Future<bool> isApiAvailable(String apiUrl) async {
  try {
    final response = await http.get(Uri.parse(apiUrl)).timeout(Duration(seconds: 2));
    return response.statusCode == 200;
  } catch (error) {
    return false;
  }
}
Future<bool> isTokenValid(String token) async {
  try {
    final response = await http.get(Uri.parse('${api}building'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        });
    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    print(error);
    return false;
  }
}

class RoomProvider extends ChangeNotifier {
  List<RoomModel> rooms = [];

  void setRooms(List<RoomModel> newRooms) {
    rooms = newRooms;
    notifyListeners();
  }
}