import 'package:flutter/material.dart';

const kPrimaryBlue = Color(0xFF295299);


const kTextFieldDecoration = InputDecoration(
  hintText: 'Entrez votre mot de passe',
  contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  border: OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(10.0)),
  ),
  enabledBorder: OutlineInputBorder(
    borderSide: BorderSide(color: kPrimaryBlue),
    borderRadius: BorderRadius.all(Radius.circular(10.0)),
  ),
  focusedBorder: OutlineInputBorder(
    borderSide: BorderSide(color: kPrimaryBlue, width: 2.0),
    borderRadius: BorderRadius.all(Radius.circular(10.0)),
  ),

);


const kPrimaryButtonBlue = Color(0xFF04567F);
const kPrimaryButtonInactive = Color(0xFF073954);
const kPrimaryButtonActive = Color(0xFF254B8C);


