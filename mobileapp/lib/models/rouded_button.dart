import 'package:flutter/material.dart';

class RoudedButton extends StatelessWidget {
  const RoudedButton({
    Key? key,
    required this.Coulour,
    required this.title,
    required this.onPressed,
  }) : super(key: key);
  final Color Coulour;
  final String title;
  final void Function() onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Material(
        elevation: 5.0,
        color: Coulour,
        borderRadius: BorderRadius.circular(30.0),
        child: MaterialButton(
          onPressed: onPressed,
          minWidth: 200.0,
          height: 42.0,
          child: Text(
            title,
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
