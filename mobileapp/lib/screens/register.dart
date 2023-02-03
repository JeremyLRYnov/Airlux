import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/widgets/rouded_button.dart';

class Register extends StatefulWidget {

  static const String id = 'register_screen';
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();

}
class _RegistrationScreenState extends State<Register> {
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

        body: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          child : SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Hero(
                  tag: 'logo',
                  child: Container(
                    height: 200.0,
                    child: Image.asset('assets/images/logo.png'),
                  ),
                ),
                SizedBox(
                  height: 48.0,
                ),
                TextField(
                  onChanged: (value) {
                    //Do something with the user input.
                  },
                  decoration: kTextFieldDecoration.copyWith(
                    hintText: 'Entrez votre email',
                  ),
                ),
                SizedBox(
                  height: 8.0,
                ),
                TextField(
                  onChanged: (value) {
                    //Do something with the user input.
                  },
                  obscureText: _isObscure,
                  decoration: kTextFieldDecoration.copyWith(
                      hintText: 'Entrez votre mot de passe',
                      prefixIcon: const Icon(Icons.lock),
                      suffixIcon: IconButton(
                          icon: Icon(
                              !_isObscure ? Icons.visibility : Icons.visibility_off),
                          onPressed: () {
                            setState(() {
                              _isObscure = !_isObscure;
                            });
                          })),
                ),
                SizedBox(
                  height: 24.0,
                ),
                RoudedButton(
                  title: 'S\'inscrire',
                  onPressed: () async {
                    setState(() {
                      _saving = true;
                    });
                    await Future.delayed(Duration(seconds: 5));
                    setState(() {
                      _saving = false;
                    });
                  },
                ),
              ],
            ),
          ),

       ),
    );
  }
}