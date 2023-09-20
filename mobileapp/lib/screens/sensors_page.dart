import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/room_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

import '../main.dart';

class Sensors extends StatefulWidget {
  const Sensors({super.key});

  @override
  State<Sensors> createState() => _SensorsState();
}

class Sensor {
  late final String entityId;
  late final String name;
  late final String sensorId;
  late final String? roomId;
  late final double value;
  late final String unit;

  Sensor(
      {this.entityId = "",
      required this.name,
      required this.sensorId,
      required this.roomId,
      required this.value,
      required this.unit});

  Future<Map<String, dynamic>> toJson() async {
    final Map<String, dynamic> data = {
      'name': name,
      'sensorId': sensorId,
      'roomId': roomId,
      "value": value,
      "unit": unit
    };
    return data;
  }
}

class Switch {
  late final String entityId;
  late final String name;
  late final String switchId;
  late final String? roomId;
  late final bool status;

  Switch(
      {this.entityId = "",
      required this.name,
      required this.switchId,
      required this.roomId,
      required this.status});

  Future<Map<String, dynamic>> toJson() async {
    final Map<String, dynamic> data = {
      'name': name,
      'switchId': switchId,
      'roomId': roomId,
      "status": status,
    };
    return data;
  }
}

class _SensorsState extends State<Sensors> {
  List<Sensor> sensors = [];
  List<Switch> switchs = [];
  TextEditingController nameController = TextEditingController();
  TextEditingController idController = TextEditingController();
  late String token;
  late String buildingId;
  late String userId;
  String? selectedRoomEntityId;
  int _currentTabIndex = 0; // Par défaut, l'onglet "Sensors" est actif

  String selectedRoomName = ''; // Pour stocker la chambre sélectionnée
  List<Map<String, String>> roomNames =
      []; // Pour stocker les noms des chambres

  @override
  void initState() {
    super.initState();
    getRoomName();
    fetchSensors();
    fetchSwitchs();
  }

  // Fonction pour effectuer la requête HTTP et extraire les noms des chambres
  Future<void> getRoomName() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    buildingId = prefs.getString('buildingId')!;
    try {
      final url = Uri.parse('${api}room');
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        final List<dynamic> results = jsonData['result'] as List<dynamic>;
        // Extraire les noms des chambres et les stocker dans la liste roomNames
        setState(() {
          roomNames = results.map<Map<String, String>>((room) {
            return {
              'name': room['name'] as String,
              'entityId': room['entityId'] as String,
            };
          }).toList();
        });
        if (roomNames.isNotEmpty) {
          setState(() {
            selectedRoomEntityId = roomNames[0]
                ['entityId']; // Sélectionnez la première chambre par défaut
          });
        }
      } else {
        // Gérer les erreurs de la requête HTTP ici
        print('Erreur lors de la requête HTTP');
      }
    } catch (error) {
      print(error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2, // Nombre d'onglets (Sensors et Switchs)
        child: Scaffold(
          appBar: AppBar(
            title: Text('Liste des appareils'),
            backgroundColor: kPrimaryBlue,
            bottom: TabBar(
              tabs: [
                Tab(text: 'Sensors'), // Onglet Sensors
                Tab(text: 'Switchs'), // Onglet Switchs
              ],
              onTap: (index) {
                setState(() {
                  _currentTabIndex = index;
                });
              },
            ),
          ),
          body: TabBarView(
            children: [
              // Premier onglet (Sensors)
              ListView.builder(
                itemCount: sensors.length,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 4,
                    margin: EdgeInsets.all(8),
                    child: GestureDetector(
                      child: ListTile(
                        title: Text(sensors[index].name),
                        trailing: IconButton(
                          icon: Icon(Icons.delete),
                          onPressed: () {
                            removeSensor(sensors[index].entityId);
                          },
                        ),
                      ),
                    ),
                  );
                },
              ),
              // Deuxième onglet (Switchs)
              ListView.builder(
                itemCount: switchs.length,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 4,
                    margin: EdgeInsets.all(8),
                    child: GestureDetector(
                      child: ListTile(
                        title: Text(switchs[index].name),
                        trailing: IconButton(
                          icon: Icon(Icons.delete),
                          onPressed: () {
                            removeSwitch(switchs[index].entityId);
                          },
                        ),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
          floatingActionButton: FloatingActionButton(
            backgroundColor: kPrimaryBlue,
            onPressed: () {
              if (_currentTabIndex == 0) {
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('Ajouter un sensor'),
                        content: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            TextField(
                              controller: nameController,
                              decoration: InputDecoration(labelText: 'Nom'),
                            ),
                            TextField(
                              controller: idController,
                              decoration: InputDecoration(labelText: 'Id'),
                            ),
                            DropdownButton<String?>(
                              value: selectedRoomEntityId,
                              onChanged: (String? newValue) {
                                setState(() {
                                  selectedRoomEntityId = newValue;
                                });
                              },
                              items: roomNames.map<DropdownMenuItem<String?>>(
                                  (Map<String, String> room) {
                                return DropdownMenuItem<String?>(
                                  value: room['entityId'],
                                  child: Text(room['name']!),
                                );
                              }).toList(),
                            ),
                          ],
                        ),
                        actions: <Widget>[
                          ElevatedButton(
                            child: Text('Ajouter'),
                            onPressed: () {
                              addSensor();
                              Navigator.of(context).pop();
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: kPrimaryBlue,
                            ),
                          ),
                        ],
                      );
                    });
              } else if (_currentTabIndex == 1) {
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('Ajouter un switch'),
                        content: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            TextField(
                              controller: nameController,
                              decoration: InputDecoration(labelText: 'Nom'),
                            ),
                            TextField(
                              controller: idController,
                              decoration: InputDecoration(labelText: 'Id'),
                            ),
                            DropdownButton<String?>(
                              value: selectedRoomEntityId,
                              onChanged: (String? newValue) {
                                setState(() {
                                  selectedRoomEntityId = newValue;
                                });
                              },
                              items: roomNames.map<DropdownMenuItem<String?>>(
                                  (Map<String, String> room) {
                                return DropdownMenuItem<String?>(
                                  value: room['entityId'],
                                  child: Text(room['name']!),
                                );
                              }).toList(),
                            ),
                          ],
                        ),
                        actions: <Widget>[
                          ElevatedButton(
                            child: Text('Ajouter'),
                            onPressed: () {
                              addSwitch();
                              Navigator.of(context).pop();
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: kPrimaryBlue,
                            ),
                          ),
                        ],
                      );
                    });
              }
            },
            child: Icon(Icons.add),
          ),
        ));
  }

  Future<void> addSensor() async {
    final prefs = await SharedPreferences.getInstance();
    userId = prefs.getString('userId')!;
    final String name = nameController.text;
    final String sensorId = idController.text;
    final String? roomId = selectedRoomEntityId;
    String unit = "";
    if (name.isNotEmpty) {
      if (name == "temperature") {
        unit = "°C";
      } else if (name == "humidite") {
        unit = "%";
      }
      final newSensor = Sensor(
          name: name,
          sensorId: sensorId,
          roomId: roomId,
          value: 10.0,
          unit: unit);
      final jsonData = jsonEncode(await newSensor.toJson());
      try {
        final response = await http.post(
          Uri.parse('${api}sensor/create'),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
          body: jsonData,
        );
        if (response.statusCode == 200) {
          Fluttertoast.showToast(
            msg: 'Sensor ajouté !',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
            backgroundColor: Colors.black,
            textColor: Colors.white,
          );
          fetchSensors();
        } else {
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
          msg: 'Erreur: $error',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
      }
    }
  }

  Future<void> fetchSensors() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    try {
      final response = await http.get(
        Uri.parse('${api}sensor'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);

        if (jsonData['result'] != null) {
          final List<dynamic> sensorList = jsonData['result'] as List<dynamic>;
          final List<Sensor> loadedSensors = sensorList.map((item) {
            return Sensor(
              entityId: item['entityId'] as String,
              name: item['name'] as String,
              sensorId: item['sensorId'] as String,
              roomId: item['roomId'] as String,
              value: (item['value'] as num).toDouble(),
              unit: item['unit'] as String,
            );
          }).toList();
          setState(() {
            sensors = loadedSensors;
          });
        } else {
          throw Exception(
              'Failed to load buildings: "result" property not found in JSON.');
        }
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> removeSensor(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('${api}sensor/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: 'Sensor supprimé !',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
        fetchSensors();
      } else {
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
        msg: 'Erreur: $error',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.black,
        textColor: Colors.white,
      );
    }
  }

  Future<void> addSwitch() async {
    final prefs = await SharedPreferences.getInstance();
    userId = prefs.getString('userId')!;
    final String name = nameController.text;
    final String switchId = idController.text;
    final String? roomId = selectedRoomEntityId;
    if (name.isNotEmpty) {}
    final newSensor =
        Switch(name: name, switchId: switchId, roomId: roomId, status: false);
    final jsonData = jsonEncode(await newSensor.toJson());
    try {
      final response = await http.post(
        Uri.parse('${api}switch/create'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonData,
      );
      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: 'Switch ajouté !',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
        fetchSwitchs();
      } else {
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
        msg: 'Erreur: $error',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.black,
        textColor: Colors.white,
      );
    }
  }

  Future<void> fetchSwitchs() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    try {
      final response = await http.get(
        Uri.parse('${api}switch'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);

        if (jsonData['result'] != null) {
          final List<dynamic> switchList = jsonData['result'] as List<dynamic>;
          final List<Switch> loadedSwitch = switchList.map((item) {
            return Switch(
              entityId: item['entityId'] as String,
              name: item['name'] as String,
              switchId: item['switchId'] as String,
              roomId: item['roomId'] as String,
              status: item['status'] as bool,
            );
          }).toList();
          setState(() {
            switchs = loadedSwitch;
          });
        } else {
          throw Exception(
              'Failed to load buildings: "result" property not found in JSON.');
        }
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> removeSwitch(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('${api}switch/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: 'Sensor supprimé !',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
        fetchSwitchs();
      } else {
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
        msg: 'Erreur: $error',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.black,
        textColor: Colors.white,
      );
    }
  }
}
