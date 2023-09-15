import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: SendDataScreen(),
    ),
  );
}

class SendDataScreen extends StatefulWidget {
  const SendDataScreen({super.key});

  @override
  _SendDataScreenState createState() => _SendDataScreenState();
}

class _SendDataScreenState extends State<SendDataScreen> {
  final _formKey = GlobalKey<FormState>();
  String _ssid ="";
  String _password="";

  _submit() async{
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
        title: const Text('Envoyer des données'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              TextFormField(
                decoration: const InputDecoration(labelText: 'SSID'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Entrez un SSID';
                  }
                  return null;
                },
                onSaved: (value) => _ssid = value!,
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Mot de passe'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Entrez un mot de passe';
                  }
                  return null;
                },
                onSaved: (value) => _password = value!,
              ),
              ElevatedButton(
                onPressed: _submit,
                child: const Text('Envoyer'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}