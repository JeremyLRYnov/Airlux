import 'package:flutter/material.dart';

class AddSensors extends StatelessWidget {
  String sensor_name='';

  @override
  Widget build(BuildContext context) {
    return Container(

      child: Container(
        padding: EdgeInsets.all(15.0),
        decoration: BoxDecoration(
          color: Colors.blue.shade900,
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(20.0),
            topLeft: Radius.circular(20.0),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Searching...',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextField(
              textAlign: TextAlign.center,
              cursorColor: Colors.black,
              onChanged: (value) {
                sensor_name = value;
              },
            ),
          ],
        ),
      ),
    );
  }
}