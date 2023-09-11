import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class ColumnListElement extends StatelessWidget {
  const ColumnListElement({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: kPrimaryButtonActive,
            borderRadius: BorderRadius.circular(20),
          ),
          width: 160,
          height: 80,
        ),
        Container(
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: kPrimaryButtonActive,
            borderRadius: BorderRadius.circular(20),
          ),
          width: 160,
          height: 80,
        ),
      ],
    );
  }
}
