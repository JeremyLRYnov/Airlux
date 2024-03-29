import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/widgets/footer_menu.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../main.dart';

class Building {
  late final String entityId;
  late final String userEmail;
  final String name;
  final String createdBy;

  Building({this.entityId = "", required this.name, required this.createdBy});

  Future<Map<String, dynamic>> toJson() async {
    final prefs = await SharedPreferences.getInstance();
    userEmail = prefs.getString('email')!;
    final Map<String, dynamic> data = {
      'name': name,
      'createdBy': createdBy,
      'users': [userEmail],
    };
    return data;
  }
}

class BuildingListPage extends StatefulWidget {
  @override
  _BuildingListPageState createState() => _BuildingListPageState();
}

class _BuildingListPageState extends State<BuildingListPage> {
  List<Building> buildings = [];
  TextEditingController nameController = TextEditingController();
  TextEditingController addressController = TextEditingController();

  late String token;
  late String userId;

  Future<void> fetchBuildings() async {
    await isApiAvailable();
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    userId = prefs.getString('userId')!;

    try {
      final response = await http.get(
        Uri.parse('${api}building/userId/$userId'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);

        if (jsonData['result'] != null) {
          final List<dynamic> buildingList = jsonData['result'] as List<dynamic>;
          final List<Building> loadedBuildings = buildingList.map((item) {
            return Building(
              entityId: item['entityId'] as String,
              name: item['name'] as String,
              createdBy: item['createdBy'] as String,
            );
          }).toList();
          setState(() {
            buildings = loadedBuildings;
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

  @override
  void initState() {
    super.initState();
    fetchBuildings();
  }

  Future<void> navigateToHomePage(String entityId) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('buildingId', entityId);
    Navigator.of(context).pushReplacement(MaterialPageRoute(
      builder: (context) => FooterMenu(),
    ));
  }

  Future<void> addBuilding() async {
    await isApiAvailable();
    final prefs = await SharedPreferences.getInstance();
    userId = prefs.getString('userId')!;
    final String name = nameController.text;
    if (name.isNotEmpty) {
      final newBuilding = Building(name: name, createdBy: userId);
      final jsonData = jsonEncode(await newBuilding.toJson());
      try {
        final response = await http.post(
          Uri.parse('${api}building/create'),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
          body: jsonData,
        );
        if (response.statusCode == 200) {
          Fluttertoast.showToast(
            msg: 'Batiment ajouté !',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
            backgroundColor: Colors.black,
            textColor: Colors.white,);
          fetchBuildings();
        } else {
          Fluttertoast.showToast(
            msg: response.body,
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
            backgroundColor: Colors.black,
            textColor: Colors.white,);
        }
      } catch (error) {
        Fluttertoast.showToast(
          msg: 'Erreur: $error',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,);
      }
    }
  }

  Future<void> removeBuilding(String id) async {
    await isApiAvailable();
    try {
      final response = await http.delete(
        Uri.parse('${api}building/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: 'Batiment supprimé !',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,);
        fetchBuildings();
      } else {
        Fluttertoast.showToast(
          msg: response.body,
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,);
      }
    } catch (error) {
      Fluttertoast.showToast(
        msg: 'Erreur: $error',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.black,
        textColor: Colors.white,);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Liste des bâtiments'),
        backgroundColor: kPrimaryBlue,
      ),
      body: ListView.builder(
        itemCount: buildings.length,
        itemBuilder: (context, index) {
          return Card(
            elevation: 4,
            margin: EdgeInsets.all(8),
            child: GestureDetector(
              onTap: () {
                navigateToHomePage(buildings[index].entityId);
              },
              child: ListTile(
                title: Text(buildings[index].name),
                trailing: IconButton(
                  icon: Icon(Icons.delete),
                  onPressed: () {
                    removeBuilding(buildings[index].entityId);
                  },
                ),
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: kPrimaryBlue,
        onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Ajouter un bâtiment'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    TextField(
                      controller: nameController,
                      decoration: InputDecoration(labelText: 'Nom'),
                    ),
                  ],
                ),
                actions: <Widget>[
                  ElevatedButton(
                    child: Text('Ajouter'),
                    onPressed: () {
                      addBuilding();
                      Navigator.of(context).pop();
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kPrimaryBlue,
                    ),
                  ),
                ],
              );
            },
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: BuildingListPage(),
  ));
}