import 'package:flutter/material.dart';
import 'package:mobileapp/models/sensor_model.dart';
import 'package:mobileapp/widgets/sensors_tile.dart';

class SensorsList extends StatefulWidget {
  final List<SensorModel> sensors;

  const SensorsList({super.key, required this.sensors});

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