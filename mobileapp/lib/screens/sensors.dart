import 'package:flutter/material.dart';
import './add_sensors.dart';
import 'package:mobileapp/widgets/footer_menu.dart';

import 'package:mobileapp/models/constants.dart';


class Sensors extends StatelessWidget {
  static const String id = 'Sensor';


  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
              Expanded(
                child: SizedBox(),
                flex: 10,
              ),
              Container(
                margin: new EdgeInsets.all(9.0),
                child : Align(
                  alignment: Alignment.bottomRight,
                  child: FloatingActionButton(
                    backgroundColor: kPrimaryBlue,
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
                        ),
                      );
                    },
                  ),
                ),
              ),
          ],
      ),
    );
  }
}