import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/Welcome_screen.dart';
import 'package:mobileapp/screens/settings_page.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../main.dart';

class Register extends StatefulWidget {
  static const String id = 'register_screen';

  const Register({super.key});
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<Register> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController prenomController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController motDePasseController = TextEditingController();
  bool _isObscure = true;
  bool _saving = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: kPrimaryBlue,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),

      body: ModalProgressHUD(
        inAsyncCall: _saving,

        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: SingleChildScrollView(
            child: Form(
              key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Hero(
                  tag: 'logo',
                  child: SizedBox(
                    height: 200.0,
                    child: Image.asset('assets/images/logo.png'),
                  ),
                ),
                const SizedBox(
                  height: 48.0,
                ),
                TextFormField(
                  controller: prenomController,
                  decoration: kTextFieldDecoration.copyWith(
                    hintText: 'Entrez votre prénom',
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Entrez votre prénom';
                    }
                    return null;
                  },
                ).animate().fadeIn(duration: 300.ms).move(duration: 300.ms),
                const SizedBox(
                  height: 24.0,
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
                ).animate(delay: 300.ms).fadeIn(duration: 300.ms).move(duration: 300.ms),
                const SizedBox(
                  height: 24.0,
                ),
                TextFormField(
                  controller: motDePasseController,
                  obscureText: _isObscure,
                  decoration: kTextFieldDecoration.copyWith(
                    hintText: 'Entrez votre mot de passe',
                    prefixIcon: const Icon(Icons.lock),
                    suffixIcon: IconButton(
                      icon: Icon(
                        !_isObscure ? Icons.visibility : Icons.visibility_off,
                      ),
                      onPressed: () {
                        setState(() {
                          _isObscure = !_isObscure;
                        });
                      },
                    ),
                  ),
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Entrez votre mot de passe';
                    }
                    return null;
                  },
                ).animate(delay: 600.ms).fadeIn(duration: 300.ms).move(duration: 300.ms),
                const SizedBox(
                  height: 24.0,
                ),
                RectangleButton(
                  title: "S'INSCRIRE",
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
                          Uri.parse('${api}user/signup'),
                          body: {
                            'name': prenomController.text,
                            'email': emailController.text,
                            'password': motDePasseController.text,
                          },
                        ).timeout(Duration(seconds: 2));

                        setState(() {
                          if (response.statusCode == 200) {
                            Fluttertoast.showToast(
                              msg: 'Inscription réussie !',
                              toastLength: Toast.LENGTH_SHORT,
                              gravity: ToastGravity.BOTTOM,
                              backgroundColor: Colors.black,
                              textColor: Colors.white,);
                          } else {
                            print(response.body);
                            final jsonResponse = json.decode(response.body);
                            Fluttertoast.showToast(
                              msg: jsonResponse['message'].toString(),
                              toastLength: Toast.LENGTH_SHORT,
                              gravity: ToastGravity.BOTTOM,
                              backgroundColor: Colors.black,
                              textColor: Colors.white,);
                          }
                        });
                      } catch (error) {
                        print(error);
                        setState(() {
                          Fluttertoast.showToast(
                            msg: 'Erreur de connexion à Redis : $error',
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.BOTTOM,
                            backgroundColor: Colors.black,
                            textColor: Colors.white,);
                        });
                      }
                    }
                  },
                  color: kPrimaryBlue,
                ).animate(delay: 900.ms).fadeIn(duration: 300.ms).move(duration: 300.ms),
              ],
            ),
          ),
        ),
      ),
    ),
    );
  }
}

class MessageText extends StatelessWidget {
  const MessageText({
    super.key,
    required this.message,
    required this.color,
  });

  final String message;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Text(
      message,
      style: TextStyle(
        color: color,
        fontSize: 16.0,
      ),
    );
  }
}
