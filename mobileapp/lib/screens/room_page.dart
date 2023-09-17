import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../main.dart';
import '../models/constants.dart';
import '../widgets/room_item.dart';

class RoomPage extends StatefulWidget {
  @override
  _RoomPageState createState() => _RoomPageState();
}

class _RoomPageState extends State<RoomPage> {
  List<Map<String, dynamic>> rooms = [];
  late String token;
  late String buildingId;
  late String selectedRoomName = 'Salon';

  @override
  void initState() {
    super.initState();
    fetchRooms();
  }

  Future<void> fetchRooms() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    buildingId = prefs.getString('buildingId')!;

    try {
      final response = await http.get(
        Uri.parse('http://10.0.2.2:6869/room/buildingId/$buildingId'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);

        if (jsonData['result'] is List) {
          final data = jsonData['result'] as List<dynamic>;
          setState(() {
            rooms = List<Map<String, dynamic>>.from(data);
          });

          final roomProvider =
              Provider.of<RoomProvider>(context, listen: false);
          final roomList = rooms.map((room) {
            final roomName = room['name'].toString();
            String imageAsset = 'logo.png';

            if (roomName.contains('Salle de bain')) {
              imageAsset = 'bathroom.jpg';
            } else if (roomName.contains('Bureau')) {
              imageAsset = 'office.png';
            } else if (roomName.contains('Salle de classe')) {
              imageAsset = 'classroom.jpg';
            } else if (roomName.contains('Cuisine')) {
              imageAsset = 'kitchen.jpg';
            } else if (roomName.contains('Salon')) {
              imageAsset = 'livingroom.png';
            } else if (roomName.contains('Chambre')) {
              imageAsset = 'bedroom.jpg';
            }

            return RoomModel(name: roomName, imageUrl: imageAsset);
          }).toList();

          roomProvider.setRooms(roomList);
        } else {
          print("Invalid data structure in JSON response");
          print(jsonData);
        }
      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
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
            Expanded(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 16,
                  crossAxisSpacing: 16,
                ),
                itemCount: rooms.length,
                itemBuilder: (BuildContext context, int index) {
                  final room = rooms[index];
                  final roomName = room['name'].toString();
                  String imageAsset;

                  if (roomName.contains('Salle de bain')) {
                    imageAsset = 'bathroom.jpg';
                  } else if (roomName.contains('Bureau')) {
                    imageAsset = 'office.png';
                  } else if (roomName.contains('Salle de classe')) {
                    imageAsset = 'classroom.jpg';
                  } else if (roomName.contains('Cuisine')) {
                    imageAsset = 'kitchen.jpg';
                  } else if (roomName.contains('Salon')) {
                    imageAsset = 'livingroom.png';
                  } else if (roomName.contains('Chambre')) {
                    imageAsset = 'bedroom.jpg';
                  } else {
                    imageAsset = 'logo.png';
                  }

                  return RoomItem(
                    text: roomName,
                    piece: imageAsset,
                    isselected: true,
                    width: 160,
                    height: 180,
                    onpressed: () {},
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: kPrimaryBlue,
        onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: const Text('Ajouter une pièce'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextField(
                      decoration: const InputDecoration(
                        labelText: 'Nom de la pièce',
                      ),
                      onChanged: (value) {
                        selectedRoomName = value;
                      },
                    ),
                  ],
                ),
                actions: [
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                    child: const Text('Annuler'),
                  ),
                  TextButton(
                    onPressed: () async {
                      final prefs = await SharedPreferences.getInstance();
                      token = prefs.getString('token')!;
                      buildingId = prefs.getString('buildingId')!;

                      final newRoom = NewRoom(
                        name: selectedRoomName,
                        buildingId: buildingId,
                      );
                      try {
                        final response = await http.post(
                          Uri.parse('http://10.0.2.2:6869/room/create'),
                          headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer $token',
                          },
                          body: jsonEncode(newRoom.toJson()),
                        );
                        if (response.statusCode == 200) {
                          print(response.body);
                          Navigator.of(context).pop();
                          fetchRooms();
                        } else {
                          print(response.body);
                        }
                      } catch (error) {
                        print(error);
                      }
                    },
                    child: const Text('Ajouter'),
                  ),
                ],
              );
            },
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class RoomModel {
  final String name;
  final String imageUrl;

  RoomModel({required this.name, required this.imageUrl});
}

class NewRoom {
  String name;
  String buildingId;

  NewRoom({
    required this.name,
    required this.buildingId,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'buildingId': buildingId,
    };
  }
}