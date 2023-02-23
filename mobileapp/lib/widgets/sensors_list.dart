import 'package:flutter/material.dart';
import './sensors_tile.dart';
import '../models/sensor_model.dart';

class SensorsList extends StatefulWidget {
  final List<SensorModel> sensors;

  SensorsList({super.key, required this.sensors});

  @override
  State<SensorsList> createState() => _SensorsListState();
}

class _SensorsListState extends State<SensorsList> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) {
        return SensorTile(
          SensorTitle: widget.sensors[index].name,
        );
      },
    );
  }
}