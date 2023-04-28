import 'package:flutter/material.dart';
import './add_sensors.dart';
import 'package:mobileapp/models/constants.dart';
import '../widgets/sensors_list.dart';
import '../models/sensor_model.dart';

class Sensors extends StatefulWidget {
  const Sensors({super.key});

  @override
  State<Sensors> createState() => _SensorsState();
}

class _SensorsState extends State<Sensors> {
  List<SensorModel> sensors = [
    SensorModel(name: "Camera"),
    SensorModel(name: "Capteur Humidité"),
    SensorModel(name: "Capteur Température"),
  ];


  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
              const Padding(padding: EdgeInsets.only(left: 51, top: 93),
                child:
                Text(
                  'Capteurs',
                  style: TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.w700,
                    color: Colors.black,
                  ),
                ),
              ),
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),

                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20.0),
                    topRight: Radius.circular(20.0),
                  ),
                ),
                child: SensorsList(
                  sensors: sensors,
                ),
              ),
            ),
              Container(
                margin: const EdgeInsets.all(9.0),
                child : Align(
                  alignment: Alignment.bottomRight,
                  child: FloatingActionButton(
                    backgroundColor: kPrimaryBlue,
                    child: const Icon(
                      Icons.add,
                    ),
                    onPressed: () {
                      showModalBottomSheet(context: context,
                        isScrollControlled: true,
                        builder: (context) => SingleChildScrollView(
                          child: Container(
                            padding: EdgeInsets.only(
                                bottom: MediaQuery.of(context).viewInsets.bottom),
                            child: AddSensors(addSensorCallBack: (SensorTitle) {
                              setState(() {
                                sensors.add(SensorModel(name: SensorTitle));
                              });
                              Navigator.pop(context);
                            })
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