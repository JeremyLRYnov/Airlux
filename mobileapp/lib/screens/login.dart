import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/buildings_page.dart';
import 'package:mobileapp/screens/settings_page.dart';
import 'package:mobileapp/widgets/footer_menu.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../main.dart';


class Login extends StatefulWidget {

  static const String id ='login_screen';

  const Login({super.key});
  @override
  _Login createState() => _Login();
}

class _Login extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController emailController = TextEditingController();
  TextEditingController motDePasseController = TextEditingController();
  bool _saving = false;
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
                child: Form(
                  key: _formKey,
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
                    TextFormField(
                      controller: emailController,
                      decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Entrez votre email',
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Entrez votre email';
                        }
                        return null;
                      },
                    ).animate().fadeIn(duration: 300.ms).move(duration: 300.ms),
                    const SizedBox(
                      height: 24.0,
                    ),

                    TextFormField(
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
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Entrez votre mot de passe';
                        }
                        return null;
                      },
                    ).animate(delay: 300.ms).fadeIn(duration: 300.ms).move(duration: 300.ms),

                    const SizedBox(
                      height: 24.0,
                    ),

                    RectangleButton(
                      title: 'SE CONNECTER',
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          setState(() {
                            _saving = true;
                          });
                          await Future.delayed(const Duration(seconds: 1));
                          setState(() {
                            _saving = false;
                          });

                          await isApiAvailable();
                          try {
                            final response = await http.post(
                              Uri.parse('${api}user/signin'),
                              body: {
                                'email': emailController.text,
                                'password': motDePasseController.text,
                              },
                            ).timeout(Duration(seconds: 2));
                            if (response.statusCode == 200) {
                              final jsonResponse = json.decode(response.body);
                              final String token = jsonResponse['token'].toString();
                              final String userId = jsonResponse['result']['id'].toString();
                              final String email = jsonResponse['result']['email'].toString();
                              final prefs = await SharedPreferences.getInstance();
                              await prefs.setString('token', token);
                              await prefs.setString('userId', userId);
                              await prefs.setString('email', email);

                              Fluttertoast.showToast(
                                msg: 'Connexion réussie !',
                                toastLength: Toast.LENGTH_SHORT,
                                gravity: ToastGravity.BOTTOM,
                                backgroundColor: Colors.black,
                                textColor: Colors.white,
                              );

                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => BuildingListPage()),
                              );
                            } else {
                              final jsonResponse = json.decode(response.body);
                              setState(() {
                                Fluttertoast.showToast(
                                    msg: jsonResponse['message'].toString(),
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.BOTTOM,
                                    backgroundColor: Colors.black,
                                    textColor: Colors.white,);
                              });
                            }
                          } catch (error) {
                            Fluttertoast.showToast(
                              msg: 'Erreur : $error',
                              toastLength: Toast.LENGTH_SHORT,
                              gravity: ToastGravity.BOTTOM,
                              backgroundColor: Colors.black,
                              textColor: Colors.white,);
                          }
                        }
                      },
                      color: kPrimaryBlue,
                    ).animate(delay: 600.ms).fadeIn(duration: 300.ms).move(duration: 300.ms),
                  ],
                ),
              ),
          ),
        ),
      ),
    );
  }
}

