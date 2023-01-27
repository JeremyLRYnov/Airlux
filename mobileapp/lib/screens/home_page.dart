import 'package:flutter/material.dart';
import 'package:mobileapp/widgets/footer_menu.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);
  static const String id = 'HomePage';

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 4,
              child: Container(
                margin: new EdgeInsets.only(top: 30.0, left: 10.0, right: 10.0),
                child: SizedBox(
                  child: Center(
                    child: Image.asset('assets/images/logo.png', width: double.infinity),
                  ),
                ),
              ),
            ),
            Container(
              margin: new EdgeInsets.only(left: 20.0),
              child: const Text(
                'Bienvenue',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Expanded(
              flex: 7,
              child: Container(
                height: 400,
                width: double.infinity,
              ),
            ),
            const FooterMenu(),
          ],
        )
    );
  }
}
