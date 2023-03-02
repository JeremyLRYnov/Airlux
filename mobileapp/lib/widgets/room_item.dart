import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class RoomItem extends StatelessWidget {
  final String text;
  final String piece;
  final Color color;
  const RoomItem({
    super.key,
    required this.text,
    required this.piece,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(
          right: 10.0, top: 10.0, bottom: 40.0),
      width: 150,
      height: 150,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.only(topLeft: Radius.circular(20), topRight: Radius.circular(20)),
            child: Image.asset("assets/images/" + piece,
            width: double.infinity,),
          ),
          Container(
            margin: EdgeInsets.all(15),
          ),
          Text(text,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
          ),
        ],
      ),
    );
  }
}

