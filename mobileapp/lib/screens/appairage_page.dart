import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobileapp/screens/home_page.dart';
import 'package:mobileapp/screens/sensors_page.dart';

import '../models/constants.dart';
import '../widgets/footer_menu.dart';
import 'buildings_page.dart';
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
  bool _isObscure = true;

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

        await Future.delayed(const Duration(seconds: 2));

        Fluttertoast.showToast(
          msg: 'Connexion réussie !',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.black,
          textColor: Colors.white,
        );
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
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
            padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 24.0),
            child: Text(
              'Étape 1 : Connectez-vous à l\'ESP32',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          Container(
            height: 2.0,
            color: Colors.grey,
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      'Étape 2 : Insérez les identifiants WiFi',
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(
                      height: 20.0,
                    ),
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
                      obscureText: _isObscure,
                      decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Mot de passe du Wifi',
                        prefixIcon: const Icon(Icons.lock),
                        suffixIcon: IconButton(
                          icon: Icon(
                            !_isObscure
                                ? Icons.visibility
                                : Icons.visibility_off,
                          ),
                          onPressed: () {
                            setState(() {
                              _isObscure = !_isObscure;
                            });
                          },
                        ),
                      ),
                      onSaved: (value) => _password = value!,
                    ),
                    SizedBox(
                      height: 40.0,
                    ),
                    RectangleButton(
                      title: 'Appairer',
                      onPressed: _submit,
                      color: kPrimaryBlue,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
