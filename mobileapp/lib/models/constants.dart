import 'package:flutter/material.dart';

const kPrimaryBlue = Color(0xFF295299);


const kTextFieldDecoration = InputDecoration(
  hintText: 'Entrez votre mot de passe',
  contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  border: OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(32.0)),
  ),
  enabledBorder: OutlineInputBorder(
    borderSide: BorderSide(color: Colors.blueAccent),
    borderRadius: BorderRadius.all(Radius.circular(32.0)),
  ),
  focusedBorder: OutlineInputBorder(
    borderSide: BorderSide(color: Colors.blueAccent, width: 2.0),
    borderRadius: BorderRadius.all(Radius.circular(32.0)),
  ),

);


const kPrimaryButtonBlue = Color(0xFF04567F);
const kPrimaryButtonInactive = Color(0xFF073954);
const kPrimaryButtonActive = Color(0xFF254B8C);


