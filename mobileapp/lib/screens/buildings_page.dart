import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobileapp/models/constants.dart';

class Building {
  final String name;

  Building({required this.name});
}

class BuildingListPage extends StatefulWidget {
  @override
  _BuildingListPageState createState() => _BuildingListPageState();
}

class _BuildingListPageState extends State<BuildingListPage> {
  List<Building> buildings = [];
  TextEditingController nameController = TextEditingController();
  TextEditingController addressController = TextEditingController();

  Future<void> fetchBuildings() async {
    final response = await http.get(Uri.parse('http://12.0.2.2/building'));

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body) as List<dynamic>;
      final List<Building> loadedBuildings = data.map((item) {
        return Building(name: item['name'] as String,);
      }).toList();

      setState(() {
        buildings = loadedBuildings;
      });
    } else {
      throw Exception('Failed to load buildings');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchBuildings();
  }

  void addBuilding() {
    final String name = nameController.text;

    if (name.isNotEmpty) {
      final newBuilding = Building(name: name);

      final jsonData = jsonEncode(newBuilding);

      http.post(
        Uri.parse('http://12.0.2.2/building'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      ).then((response) {
        if (response.statusCode == 201) {
          setState(() {
            buildings.add(newBuilding);
            nameController.clear();
            addressController.clear();
          });
          Navigator.of(context).pop();
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Échec de l\'ajout du bâtiment.'),
            ),
          );
        }
      });
    }
  }

  void removeBuilding(int index) {
    setState(() {
      buildings.removeAt(index);
    });
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
            elevation: 4, // élévation pour un effet de carte
            margin: EdgeInsets.all(8), // marge autour de la carte
            child: ListTile(
              title: Text(buildings[index].name),
              trailing: IconButton(
                icon: Icon(Icons.delete),
                onPressed: () {
                  removeBuilding(index);
                },
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
                      backgroundColor: kPrimaryBlue
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