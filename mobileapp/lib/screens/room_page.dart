import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
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
  bool isDeleting = false;

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
        Uri.parse('${api}room/buildingId/$buildingId'),
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

          final roomProvider = Provider.of<RoomProvider>(context, listen: false);
          final roomList = rooms.map((room) {
            final roomId = room['entityId'].toString();
            final roomName = room['name'].toString();

            print(roomName + " " +roomId);

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

            return RoomModel(id: roomId, name: roomName, imageUrl: imageAsset);
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

  Future<void> deleteRoom(String roomId) async {
    print(roomId);
    try {
      final response = await http.delete(
        Uri.parse('${api}room/$roomId'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: 'Salle supprimée !',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
        print(response.body);
        fetchRooms();
      } else {
        print(response.body);
        Fluttertoast.showToast(
          msg: response.body,
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
      }
    } catch (error) {
      Fluttertoast.showToast(
        msg: 'Erreur : $error',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.black,
        textColor: Colors.white,);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: const EdgeInsets.only(top: 80, left: 20, right: 10),
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
                    roomId: room['entityId'].toString(),
                    isToDelete: isDeleting,
                    onDelete: deleteRoom,
                    onpressed: () {},
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: Align(
        alignment: Alignment.bottomRight,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            FloatingActionButton(
              backgroundColor: Colors.red,
              onPressed: () {
                setState(() {
                  isDeleting = !isDeleting;
                });
              },
              child: Icon(isDeleting ? Icons.close : Icons.delete),
            ),
            SizedBox(height: 16),
            FloatingActionButton(
              backgroundColor: kPrimaryBlue,
              onPressed: () {
                String subtitle = '';
                String nameToSend = '';
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return StatefulBuilder(
                      builder: (BuildContext context, StateSetter setState) {
                        return AlertDialog(
                          title: const Text('Ajouter une pièce'),
                          content: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              DropdownButton<String>(
                                value: selectedRoomName,
                                onChanged: (String? newValue) {
                                  setState(() {
                                    selectedRoomName = newValue!;
                                  });
                                },
                                items: <String>[
                                  'Salon',
                                  'Salle de bain',
                                  'Bureau',
                                  'Salle de classe',
                                  'Cuisine',
                                  'Chambre',
                                ].map<DropdownMenuItem<String>>((String value) {
                                  return DropdownMenuItem<String>(
                                    value: value,
                                    child: Text(value),
                                  );
                                }).toList(),
                              ),
                              TextField(
                                decoration: const InputDecoration(
                                  labelText: 'Sous-titre de la pièce',
                                ),
                                onChanged: (value) {
                                  if (value.length <= 8) {
                                    setState(() {
                                      subtitle = value;
                                    });
                                  }
                                },
                                maxLength: 8,
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
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: kPrimaryBlue,
                              ),
                              onPressed: () async {
                                final prefs = await SharedPreferences.getInstance();
                                token = prefs.getString('token')!;
                                buildingId = prefs.getString('buildingId')!;
                                if (subtitle != '') {
                                  nameToSend = '$selectedRoomName $subtitle';
                                } else {
                                  nameToSend = selectedRoomName;
                                }
                                final newRoom = NewRoom(
                                  name: nameToSend,
                                  buildingId: buildingId,
                                );
                                try {
                                  final response = await http.post(
                                    Uri.parse('${api}room/create'),
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Accept': 'application/json',
                                      'Authorization': 'Bearer $token',
                                    },
                                    body: jsonEncode(newRoom.toJson()),
                                  );
                                  if (response.statusCode == 200) {
                                    Fluttertoast.showToast(
                                      msg: 'Salle ajoutée !',
                                      toastLength: Toast.LENGTH_SHORT,
                                      gravity: ToastGravity.BOTTOM,
                                      backgroundColor: Colors.black,
                                      textColor: Colors.white,
                                    );
                                    print(response.body);
                                    Navigator.of(context).pop();
                                    fetchRooms();
                                  } else {
                                    print(response.body);
                                    Fluttertoast.showToast(
                                      msg: response.body,
                                      toastLength: Toast.LENGTH_SHORT,
                                      gravity: ToastGravity.BOTTOM,
                                      backgroundColor: Colors.black,
                                      textColor: Colors.white,);
                                  }
                                } catch (error) {
                                  Fluttertoast.showToast(
                                    msg: 'Erreur : $error',
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.BOTTOM,
                                    backgroundColor: Colors.black,
                                    textColor: Colors.white,);
                                }
                              },
                              child: const Text('Ajouter'),
                            ),
                          ],
                        );
                      },
                    );
                  },
                );
              },
              child: Icon(Icons.add),
            ),
          ],
        ),
      ),
    );
  }
}

class RoomModel {
  final String id;
  final String name;
  final String imageUrl;
  bool isSelectedForDeletion;

  RoomModel({
    required this.id,
    required this.name,
    required this.imageUrl,
    this.isSelectedForDeletion = false,
  });
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