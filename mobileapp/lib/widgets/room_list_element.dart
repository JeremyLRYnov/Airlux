import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class RoomListElement extends StatelessWidget {
  const RoomListElement({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10),
      width: 150,
      height: 150,
      decoration: BoxDecoration(
        color: kPrimaryButtonBlue,
        borderRadius: BorderRadius.circular(20),
      ),
    );
  }
}