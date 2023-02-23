import 'package:flutter/material.dart';

class ConnectWifiSensor extends StatelessWidget {
  String STA_DEFAULT_SSID = '';
  String STA_DEFAULT_PASSWORD = '';

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        padding: EdgeInsets.all(15.0),
        decoration: BoxDecoration(
          color: Colors.blue.shade900,
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(10.0),
            topLeft: Radius.circular(10.0),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              height: 40.0,
            ),
            Text(
              'Searching...',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 40.0,
            ),
            TextField(
              textAlign: TextAlign.center,
              cursorColor: Colors.black,
              style: TextStyle(color: Colors.black),
              decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.never,
                labelText: 'Nom du capteur',
                labelStyle: TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                hintStyle: TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                filled: true,
                fillColor: Colors.blueGrey[50],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onChanged: (value) {
                STA_DEFAULT_SSID = value;
              },
            ),
            SizedBox(
              height: 30.0,
            ),
            //Faire une row, faire un container vide sur 50% de la row
            // 50% restant pour le boutton
            MaterialButton(
              child: Text(
                'Se conecter',
                style: TextStyle(
                  color: Colors.black,
                ),
              ),
              color: Colors.blueGrey[50],
              onPressed: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }
}