import 'package:flutter/material.dart';

class SensorModel {
  SensorModel ({required this.name, this.isDone = false});
  final String name;
  bool isDone;

  void toggleDone() {
    isDone = !isDone;
  }
}