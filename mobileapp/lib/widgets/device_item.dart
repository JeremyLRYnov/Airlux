import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class DeviceItem extends StatelessWidget {
  const DeviceItem({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
          right: 10.0, bottom: 10.0, top: 5.0),
      decoration: BoxDecoration(
        color: kPrimaryButtonActive,
        borderRadius: BorderRadius.circular(20),
      ),
      width: 160,
      height: 80,
      child: Row(
        children: [
          Icon(Icons.abc),
          Text("test"),
        ],
      ),
    );
  }
}
