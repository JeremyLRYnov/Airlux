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
  late String switchId;
  late String tempId;
  late String humId;

  String tempVal = '';
  String humVal = '';
  String lightState = '';

  Timer? timer;

  void startTimer() {
    const duration = Duration(seconds: 1);
    timer = Timer.periodic(duration, (_) {
      getTempValue();
      getHumValue();
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

    switchId = "01HA71KKG9KDHD8G1N7RD7QB4C";
    tempId = "01HA6ZKPJ53QDXV4WNHMBAAJ6Z";
    humId = "01HAKPXRX1JPB039B981D8G2B5";
    // Démarrez le minuteur lorsque le widget est initialisé.
    startTimer();
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
        body:
        Column(
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
                            children:[
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
                                  color: lightState == 'allumée' ? kPrimaryButtonActive : kPrimaryButtonInactive,
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
                      height: 20.0,
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
                            onpressed: () {
                              _onItemSelected(index);
                            },
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

  Future<void> switchLight() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;
    switchId = "01HA71KKG9KDHD8G1N7RD7QB4C";

    try {
      final url = Uri.parse('http://10.0.2.2:6869/switch/updateStatus/$switchId');
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


            final roundedValue = value.toStringAsFixed(2);
            final unit = result['unit'];

            final temperatureValue = '$roundedValue $unit';
            setState(() {
              this.tempVal = temperatureValue;
            });
          }
           else {
            print('La valeur n\'est pas de type double');

        }
      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> getHumValue() async {

    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;


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

            final humidityValue = '$value $unit';
            setState(() {
              this.humVal = humidityValue;
            });
          } else {
            print('La valeur n\'est pas de type double');
          }

      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
    }
  }

  Future<void> getSwitchValue() async {

    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token')!;

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
            setState(() {
              this.lightState = status == true ? 'allumée' : 'éteinte';
            });
        }
      } else {
        print(response.body);
      }
    } catch (error) {
      print(error);
    }
  }

}
