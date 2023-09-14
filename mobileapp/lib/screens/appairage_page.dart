import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';

import '../models/constants.dart';
import 'settings_page.dart';

class AppairagePage extends StatefulWidget {
  const AppairagePage({super.key});

  @override
  _AppairagePageState createState() => _AppairagePageState();
}

class _AppairagePageState extends State<AppairagePage> {
  final _formKey = GlobalKey<FormState>();
  String _ssid = "";
  String _password = "";

  _submit() async {
    print("Submit");
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        // Créer une connexion TCP avec l'ESP32
        Socket socket = await Socket.connect('192.168.4.1', 80);
        // Envoyer les données SSID et mot de passe WiFi à l'ESP32
        socket.write("$_ssid\n");
        print("SSID: $_ssid\n");
        socket.write("$_password\n");
        print("PWD: $_password\n");
        // Attendre la réponse de l'ESP32
        String response = await utf8.decoder.bind(socket).join();
        print(response);
        // Fermer la connexion
        socket.close();
      } catch (e) {
        print(e);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Appairage Box'),
        backgroundColor: kPrimaryBlue,
      ),
      body: Center(
        child: Padding(
          padding:const EdgeInsets.symmetric(horizontal: 24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              // Centrer verticalement
              children: <Widget>[
                TextFormField(
                  decoration: kTextFieldDecoration.copyWith(
                    hintText: 'Nom du Wifi',
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Entrez un SSID';
                    }
                    return null;
                  },
                  onSaved: (value) => _ssid = value!,
                ),
                const SizedBox(
                  height: 20.0,
                ),
                TextFormField(
                  decoration: kTextFieldDecoration.copyWith(
                    hintText: 'Mot de passe du Wifi',
                  ),
                  onSaved: (value) => _password = value!,
                ),
                SizedBox(
                  height: 40.0,
                ),
                RectangleButton(
                    title: 'Appairer',
                    onPressed: _submit,
                    color: kPrimaryBlue),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
