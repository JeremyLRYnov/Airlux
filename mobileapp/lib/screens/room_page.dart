import 'package:flutter/material.dart';
import 'package:mobileapp/widgets/room_item.dart';

class RoomPage extends StatelessWidget {
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
                margin: const EdgeInsets.only(top:20),
              ),
              Container(
                margin: const EdgeInsets.only(left: 20, right: 20),
                child: Row(
                  children: [
                    RoomItem(
                      text: "Salle de bain",
                      piece: "bathroom.jpg",
                      isselected: true,
                      width: 160,
                      height: 180,
                      onpressed: () {},
                    ),

                    RoomItem(
                      text: "Salon",
                      piece: "livingroom.png",
                      isselected: true,
                      width: 160,
                      height: 180,
                      onpressed: () {},
                    ),
                  ],
                ),
              ),
              Container(
                margin: const EdgeInsets.only(left: 20, right: 20),
                child: Row(
                  children: [
                    RoomItem(
                      text: "Cuisine",
                      piece: "kitchen.jpg",
                      isselected: true,
                      width: 160,
                      height: 180,
                      onpressed: () {},
                    ),
                    RoomItem(
                      text: "Chambre",
                      piece: "bedroom.jpg",
                      isselected: true,
                      width: 160,
                      height: 180,
                      onpressed: () {},
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
    );
  }
}
