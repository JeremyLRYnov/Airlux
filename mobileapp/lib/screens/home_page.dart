import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/room_page.dart';
import 'package:mobileapp/widgets/device_item.dart';
import 'package:mobileapp/widgets/room_item.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../main.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  static const String id = 'HomePage';

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int selectedIndex = 0;

  late String token;
  late String switchId = '';
  late String tempId = '';
  late String humId = '';

  String tempVal = 'Pas de valeur';
  String humVal = 'Pas de valeur';
  String lightState = 'Pas de valeur';

  Timer? timer;

  List<String> entityIds = [];

  void startTimerSensors() {
    const duration = Duration(seconds: 10);
    timer = Timer.periodic(duration, (_) {
      recupSensorsIds();
      recupSwitchIds();
      getTempValue();
      getHumValue();
    });
  }

  void startTimerSwitchs() {
    const duration = Duration(seconds: 1);
    timer = Timer.periodic(duration, (_) {
      recupSwitchIds();
      getSwitchValue();
    });
  }

  void _onItemSelected(int index) {
    setState(() {
      selectedIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();

    recupSensorsIds();
    recupSwitchIds();
    startTimerSensors();
    startTimerSwitchs();
  }

  @override
  Widget build(BuildContext context) {
    final roomProvider = Provider.of<RoomProvider>(context);
    final roomList = roomProvider.rooms;
    return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: Scaffold(
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 4,
              child: Container(
                margin:
                    const EdgeInsets.only(top: 30.0, left: 10.0, right: 10.0),
                child: SizedBox(
                  child: Center(
                    child: Image.asset(
                      'assets/images/logo.png',
                      width: double.infinity,
                    ),
                  ),
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 20.0),
              child: const Text(
                'Bienvenue',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Expanded(
              flex: 7,
              child: Container(
                margin: const EdgeInsets.only(left: 40.0),
                height: 400,
                width: double.infinity,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      margin: const EdgeInsets.only(bottom: 10.0),
                      child: const Text(
                        'Appareils',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Expanded(
                      child: ListView(
                        scrollDirection: Axis.horizontal,
                        children: [
                          Column(
                            children: [
                              DeviceItem(
                                icon: Icons.ac_unit_rounded,
                                text: "Température",
                                value: tempVal,
                                color: kPrimaryButtonActive,
                              ),
                              GestureDetector(
                                onTap: () {
                                  switchLight();
                                },
                                child: DeviceItem(
                                  icon: Icons.light_rounded,
                                  text: "Lumière",
                                  value: lightState,
                                  color: lightState == 'allumée'
                                      ? kPrimaryButtonActive
                                      : kPrimaryButtonInactive,
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              DeviceItem(
                                icon: Icons.water_rounded,
                                text: "Humidité",
                                value: humVal,
                                color: kPrimaryButtonActive,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 0.0,
                    ),
                    Container(
                      margin: const EdgeInsets.only(bottom: 10.0),
                      child: const Text(
                        'Pièces',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Expanded(
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: roomList.length,
                        itemBuilder: (context, index) {
                          final room = roomList[index];
                          return RoomItem(
                            text: room.name,
                            piece: room.imageUrl,
                            isselected: selectedIndex == index,
                            width: 150,
                            height: 150,
                            isToDelete: false,
                            onpressed: () {
                              _onItemSelected(index);
                            },
                            roomId: '',
                          );
                        },
                      ),
                    ),
                    SizedBox(
                      height: 40,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> recupSensorsIds() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    try {
      final url = Uri.parse('http://10.0.2.2:6869/sensor/');
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);

        if (jsonData['result'] != null) {
          final result = jsonData['result'];
          if (result is List && result.isEmpty) {
            tempId = '';
            humId = '';
          } else {
            for (var sensorData in result) {
              final name = sensorData['name'] as String?;
              final entityId = sensorData['entityId'] as String;

              if (name == "temperature") {
                tempId = entityId;
              } else if (name == "humidite") {
                humId = entityId;
              }
            }
          }
        }
      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> recupSwitchIds() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;

    try {
      final url = Uri.parse('http://10.0.2.2:6869/switch/');
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);

        if (jsonData['result'] != null) {
          final result = jsonData['result'];
          if (result is List && result.isEmpty) {
            switchId = '';
          }
          for (var switchData in result) {
            final name = switchData['name'] as String?;
            if (name == "lumiere") {
              final entityId = switchData['entityId'] as String;
              entityIds.add(entityId);
              switchId = entityIds.isNotEmpty ? entityIds[0] : '';
            }
          }
        }
      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> switchLight() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;

    try {
      final url =
          Uri.parse('http://10.0.2.2:6869/switch/updateStatus/$switchId');
      final response = await http.patch(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);
        print(jsonData);
      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> getTempValue() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;

    if (tempId != '') {
      try {
        final url = Uri.parse('http://10.0.2.2:6869/sensor/$tempId');
        final response = await http.get(
          url,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        );

        if (response.statusCode == 200) {
          final jsonData = jsonDecode(response.body);

          if (jsonData['result'] != null) {
            final result = jsonData['result'];
            final value = result['value'];
            final unit = result['unit'];

            if (value != null || unit != null) {
              final roundedValue = value.toStringAsFixed(2);
              final temperatureValue = '$roundedValue $unit';
              setState(() {
                this.tempVal = temperatureValue;
              });
            }
          } else {
            print('La valeur n\'est pas bonne');
          }
        } else {
          print(response.body);
        }
      } catch (error) {
        print(error);
      }
    } else {
      setState(() {
        this.tempVal = 'Pas de valeur';
      });
    }
  }

  Future<void> getHumValue() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;

    if (humId != '') {
      try {
        final url = Uri.parse('http://10.0.2.2:6869/sensor/$humId');
        final response = await http.get(
          url,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        );

        if (response.statusCode == 200) {
          final jsonData = jsonDecode(response.body);

          if (jsonData['result'] != null) {
            final result = jsonData['result'];
            final value = result['value'];
            final unit = result['unit'];

            if (value != null) {
              final humidityValue = '$value $unit';
              setState(() {
                this.humVal = humidityValue;
              });
            }
          } else {
            print('La valeur n\'est pas bonne');
          }
        } else {
          print(response.body);
        }
      } catch (error) {
        print(error);
      }
    } else {
      setState(() {
        this.humVal = 'Pas de valeur';
      });
    }
  }

  Future<void> getSwitchValue() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    if (switchId != '') {
      try {
        final url = Uri.parse('http://10.0.2.2:6869/switch/$switchId');
        final response = await http.get(
          url,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        );

        if (response.statusCode == 200) {
          final jsonData = jsonDecode(response.body);

          if (jsonData['result'] != null) {
            final result = jsonData['result'];
            final status = result['status'];
            if (status != null) {
              setState(() {
                this.lightState = status == true ? 'allumée' : 'éteinte';
              });
            }
          }
        } else {
          print(response.body);
        }
      } catch (error) {
        print(error);
      }
    } else {
      setState(() {
        this.lightState = 'Pas de valeur';
      });
    }
  }
}
