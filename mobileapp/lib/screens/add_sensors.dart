import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class AddSensors extends StatelessWidget {
  AddSensors({Key? key, required this.addSensorCallBack}) : super(key: key);
  final void Function(String) addSensorCallBack;

  String name = '';

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        padding: const EdgeInsets.all(15.0),
        decoration: const BoxDecoration(
          color: kPrimaryBlue,
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(10.0),
            topLeft: Radius.circular(10.0),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(
              height: 40.0,
            ),
            const Text(
              'Searching...',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(
              height: 40.0,
            ),
            TextField(
              textAlign: TextAlign.center,
              cursorColor: Colors.black,
              style: const TextStyle(color: Colors.black),
              decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.never,
                labelText: 'Nom du capteur...',
                labelStyle: const TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                hintStyle: const TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                filled: true,
                fillColor: Colors.blueGrey[50],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onChanged: (value) {
               name = value;
              },
            ),
            const SizedBox(
              height: 30.0,
            ),
                 //Faire une row, faire un container vide sur 50% de la row
                // 50% restant pour le boutton
                 MaterialButton(
                   color: Colors.blueGrey[50],
                   onPressed: () {
                     if (name != '') {
                       addSensorCallBack(name);
                     }
                   },
                   child: const Text(
                   'Add',
                     style: TextStyle(
                       fontSize: 15,
                       color: Colors.black,
                     ),
                   )
                 ),
          ],
        ),
      ),
    );
  }
}