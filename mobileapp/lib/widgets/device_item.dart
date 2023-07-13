import 'package:flutter/material.dart';

class DeviceItem extends StatelessWidget {
  final String text;
  final IconData icon;
  final Color color;

  const DeviceItem({
    super.key,
    required this.text,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 10.0, bottom: 10.0, top: 5.0),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(20),
      ),
      width: 160,
      height: 80,
      child: Row(
        children: [
          Container(
            margin: const EdgeInsets.all(4),
          ),
          Icon(icon,
          color: Colors.white,),
          Container(
            margin: const EdgeInsets.all(4),
          ),
          Text(
            text,
            textAlign: TextAlign.center,
            style: const TextStyle(
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
