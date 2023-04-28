import 'package:flutter/material.dart';
import 'package:mobileapp/screens/home_page.dart';
import '../widgets/rouded_button.dart';
import '../models/constants.dart';
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
            // Action à effectuer lorsque le bouton est pressé
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
                      kTextFieldDecoration.copyWith(hintText: 'Entrer your email'),
                    ),
                    const SizedBox(
                      height: 8.0,
                    ),

                    TextField(
                      obscureText: _obscureText,
                      decoration: kTextFieldDecoration.copyWith(
                        prefixIcon: const Icon(Icons.lock),

                        hintText: 'Entrer your password',
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

                    RoudedButton(
                      title: 'Log In',
                      onPressed: () async {
                        setState(() {
                          _saving = true;
                        });
                        await Future.delayed(const Duration(seconds: 2));
                        setState(() {
                          _saving = false;
                        });
                        Navigator.pushNamed(context, HomePage.id);

                      },
                    ),
                  ],
                ),
              ),


          ),
        ),
    );
  }
}

