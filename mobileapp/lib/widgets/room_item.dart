import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class RoomItem extends StatelessWidget {
  final double width;
  final double height;
  final String text;
  final String piece;
  final bool isselected;
  final VoidCallback onpressed;
  const RoomItem({
    Key? key,
    required this.width,
    required this.height,
    required this.text,
    required this.piece,
    required this.isselected,
    required this.onpressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onpressed,
      child: Container(
        margin: const EdgeInsets.only(
            right: 10.0, top: 10.0, bottom: 40.0),
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: isselected ? kPrimaryButtonBlue : kPrimaryButtonInactive,
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
      ),
    );
  }
}
