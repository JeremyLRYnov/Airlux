import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../widgets/room_item.dart';

class RoomPage extends StatefulWidget {
  @override
  _RoomPageState createState() => _RoomPageState();
}

class _RoomPageState extends State<RoomPage> {
  List<Map<String, dynamic>> rooms = [];
  late String token;
  late String buildingId;

  @override
  void initState() {
    super.initState();
    fetchRooms();
  }

  Future<void> fetchRooms() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    buildingId = prefs.getString('buildingId')!;

    final response = await http.get(
      Uri.parse('http://10.0.2.2:6869/building/$buildingId'),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);

      final List<dynamic> data = jsonData['result'] as List<dynamic>;
      setState(() {
        rooms = List<Map<String, dynamic>>.from(data);
      });
    } else {
      // TODO
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: const EdgeInsets.only(top: 80, left: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Pièces',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 20),
            ),
            Container(
              margin: const EdgeInsets.only(left: 20, right: 20),
              child: Row(
                children: rooms.map<Widget>((room) {
                  final roomName = room['name'].toString(); // Conversion en chaîne
                  return RoomItem(
                    text: roomName,
                    piece: roomName + '.jpg',
                    isselected: true,
                    width: 160,
                    height: 180,
                    onpressed: () {},
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}