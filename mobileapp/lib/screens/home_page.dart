import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/room_page.dart';
import 'package:mobileapp/widgets/device_item.dart';
import 'package:mobileapp/widgets/room_item.dart';
import 'package:provider/provider.dart';

import '../main.dart';

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
                            }, roomId: '',
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
}
