import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
import 'package:mobileapp/screens/home_page.dart';
import 'package:mobileapp/screens/settings_page.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';


class Login extends StatefulWidget {

  static const String id ='login_screen';

  const Login({super.key});
  @override
  _Login createState() => _Login();
}

class _Login extends State<Login> {
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
                      onChanged: (value) {
                        //Do something with the user input.
                      },
                      decoration:
                      kTextFieldDecoration.copyWith(hintText: 'Entrer votre adresse mail'),
                    ),
                    const SizedBox(
                      height: 24.0,
                    ),

                    TextField(
                      obscureText: _obscureText,
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
                        setState(() {
                          _saving = true;
                        });
                        await Future.delayed(const Duration(seconds: 2));
                        setState(() {
                          _saving = false;
                        });
                        Navigator.pushNamed(context, HomePage.id);

                      }, color: kPrimaryBlue,
                    ),
                  ],
                ),
              ),
          ),
        ),
    );
  }
}

