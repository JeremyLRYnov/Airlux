import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/widgets/device_item.dart';
import 'package:mobileapp/widgets/room_item.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const String id = 'HomePage';

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int selectedIndex = 0;

  void _onItemSelected(int index) {
    setState(() {
      selectedIndex = index;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 4,
              child: Container(
                margin: const EdgeInsets.only(top: 30.0, left: 10.0, right: 10.0),
                child: SizedBox(
                  child: Center(
                    child: Image.asset('assets/images/logo.png',
                        width: double.infinity,),
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
                child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
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
                          children: const [
                            DeviceItem(
                              icon: Icons.ac_unit_rounded,
                              text: "température",
                              color: kPrimaryButtonActive,
                            ),
                            DeviceItem(
                              icon: Icons.light_rounded,
                              text: "lumière",
                              color: kPrimaryButtonInactive,
                            ),
                          ],
                        ),
                        Column(
                          children: const [
                            DeviceItem(
                              icon: Icons.water_rounded,
                              text: "humidité",
                              color: kPrimaryButtonInactive,
                            ),
                            DeviceItem(
                              icon: Icons.bolt_rounded,
                              text: "prise",
                              color: kPrimaryButtonActive,
                            ),
                          ],
                        ),
                        Column(
                          children: const [
                            DeviceItem(
                              icon: Icons.tv_rounded,
                              text: "télevision",
                              color: kPrimaryButtonInactive,
                            ),
                          ],
                        ),
                      ],
                    ),
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
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        RoomItem(
                          text: "Salle de bain",
                          piece: "bathroom.jpg",
                          width: 150,
                          height: 150,
                          isselected: selectedIndex == 0,
                          onpressed: () {
                            _onItemSelected(0);
                          },
                        ),
                        RoomItem(
                          text: "Salon",
                          piece: "livingroom.png",
                          width: 150,
                          height: 150,
                          isselected: selectedIndex == 1,
                          onpressed: () {
                            _onItemSelected(1);
                          },
                        ),
                        RoomItem(
                          text: "Cuisine",
                          piece: "kitchen.jpg",
                          width: 150,
                          height: 150,
                          isselected: selectedIndex == 2,
                          onpressed: () {
                            _onItemSelected(2);
                          },
                        ),
                        RoomItem(
                          text: "Chambre",
                          piece: "bedroom.jpg",
                          width: 150,
                          height: 150,
                          isselected: selectedIndex == 3,
                          onpressed: () {
                            _onItemSelected(3);
                          },
                        ),
                      ],
                    ),
                  ),
                ],),
              ),
            ),
          ],
        ),
    );
  }
}

