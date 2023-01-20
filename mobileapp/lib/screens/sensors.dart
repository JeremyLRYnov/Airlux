import 'package:flutter/material.dart';
import './add_sensors.dart';

class Sensors extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: Colors.white,
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue.shade900,
        child: Icon(
          Icons.add,
        ),
        onPressed: () {
          showModalBottomSheet(context: context,
            isScrollControlled: true,
            builder: (context) => SingleChildScrollView(
            child: Container(
              padding: EdgeInsets.only(
                  bottom: MediaQuery.of(context).viewInsets.bottom),
              child: AddSensors(),
            ),
          ),);
        },
      ),
    );
  }
}