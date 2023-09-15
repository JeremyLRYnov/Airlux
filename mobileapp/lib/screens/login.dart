import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/buildings_page.dart';
import 'package:mobileapp/screens/settings_page.dart';
import 'package:mobileapp/widgets/footer_menu.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


class Login extends StatefulWidget {

  static const String id ='login_screen';

  const Login({super.key});
  @override
  _Login createState() => _Login();
}

class _Login extends State<Login> {
  TextEditingController emailController = TextEditingController();
  TextEditingController motDePasseController = TextEditingController();
  bool _saving = false;
  String _message = '';
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: kPrimaryBlue,
        leading: IconButton(

          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            // When button pressed
            Navigator.pop(context);
          },
        ),
      ),

      body: ModalProgressHUD(
          inAsyncCall: _saving,

          child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child : SingleChildScrollView(

                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[

                    SizedBox(
                      height: 200.0,
                      child: Image.asset('assets/images/logo.png'),
                    ),
                    const SizedBox(
                      height: 48.0,
                    ),
                    TextField(
                      controller: emailController,
                      decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Entrez votre email',
                      ),
                    ),
                    const SizedBox(
                      height: 24.0,
                    ),

                    TextField(
                      obscureText: _obscureText,
                      controller: motDePasseController,
                      decoration: kTextFieldDecoration.copyWith(
                        prefixIcon: const Icon(Icons.lock),

                        hintText: 'Entrer votre mot de passe',
                        suffixIcon: GestureDetector(
                          onTap: () {
                            setState(() {
                              _obscureText = !_obscureText;
                            });
                          },
                          child: Icon(_obscureText ? Icons.visibility_off : Icons.visibility),
                        ),
                      ),
                    ),

                    const SizedBox(
                      height: 24.0,
                    ),

                    RectangleButton(
                      title: 'SE CONNECTER',
                      onPressed: () async {
                        if (emailController.text.isEmpty ||
                            motDePasseController.text.isEmpty) {
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                title: Text("Champs obligatoires"),
                                content: Text("Veuillez remplir tous les champs."),
                                actions: [
                                  TextButton(
                                    child: Text("OK"),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                ],
                              );
                            },
                          );
                          return;
                        }
                        setState(() {
                          _saving = true;
                        });
                        await Future.delayed(const Duration(seconds: 1));
                        setState(() {
                          _saving = false;
                        });

                        try
                        {
                          final response = await http.post(
                            // TODO put IP inside a conf file
                            Uri.parse('http://10.0.2.2:6869/user/signin'),
                            body: {
                              'email': emailController.text,
                              'password': motDePasseController.text,
                            },
                          );
                          if (response.statusCode == 200) {
                            print('Connexion à Redis réussie !');

                            final jsonResponse = json.decode(response.body);
                            final String token = jsonResponse['token'].toString();
                            final String userId = jsonResponse['result']['id'].toString();
                            final String email = jsonResponse['result']['email'].toString();
                            final prefs = await SharedPreferences.getInstance();
                            await prefs.setString('token', token);
                            await prefs.setString('userId', userId);
                            await prefs.setString('email', email);
                            print("id :" + userId);
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => BuildingListPage()),
                            );
                          } else {
                            final jsonResponse = json.decode(response.body);
                            setState(() {
                              _message = jsonResponse['message'].toString();
                            });
                            print('Erreur de connexion au serveur : ${response.statusCode} => $_message');
                          }
                        }
                        catch (error)
                        {
                          print('Erreur de connexion à Redis : $error');
                        }

                      }, color: kPrimaryBlue,
                    ),
                    const SizedBox(
                      height: 16.0,
                    ),
                    Center(
                      child: Text(
                        _message,
                        style: TextStyle(
                          color: Colors.red,
                          fontSize: 16.0,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
          ),
        ),
    );
  }
}

