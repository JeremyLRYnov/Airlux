import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class DeviceItem extends StatelessWidget {
  final String text;
  final IconData icon;
  const DeviceItem({
    super.key,
    required this.text,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(right: 10.0, bottom: 10.0, top: 5.0),
      decoration: BoxDecoration(
        color: kPrimaryButtonActive,
        borderRadius: BorderRadius.circular(20),
      ),
      width: 160,
      height: 80,
      child: Row(
        children: [
          Container(
            margin: EdgeInsets.all(4),
          ),
          Icon(icon,
          color: Colors.white),
          Container(
            margin: EdgeInsets.all(4),
          ),
          Text(
            text,
            textAlign: TextAlign.center,
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
