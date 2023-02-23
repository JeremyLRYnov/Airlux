import 'package:flutter/material.dart';

class SensorTile extends StatelessWidget {
  SensorTile(
      {required this.SensorTitle,
      });
  final String SensorTitle;


  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      width: 400,
      margin: new EdgeInsets.all(10.0),
      decoration: BoxDecoration(
       borderRadius: BorderRadius.circular(9),
        color: Colors.blueGrey[50],
      ),
      child: Text(SensorTitle,
      textAlign: TextAlign.center,
     ),
    );
  }
}