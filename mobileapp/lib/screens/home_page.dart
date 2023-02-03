import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';
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
                    child: Image.asset('assets/images/logo.png',
                        width: double.infinity),
                  ),
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(left: 20.0),
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
                margin: const EdgeInsets.only(left: 40.0),
                height: 400,
                width: double.infinity,
                child:
                    Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Container(
                        margin: EdgeInsets.only(bottom: 10.0),
                        child: const Text(
                          'Appareils',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                  ),
                        Expanded(
                          child: ListView(
                            scrollDirection: Axis.horizontal,
                            children: [
                              Column(
                                children: [
                                  Container(
                                    margin: EdgeInsets.only(
                                        right: 10.0, bottom: 10.0, top: 5.0),
                                    decoration: BoxDecoration(
                                      color: kPrimaryButtonActive,
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    width: 160,
                                    height: 80,
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(
                                        right: 10.0, bottom: 10.0, top: 5.0),
                                    decoration: BoxDecoration(
                                      color: kPrimaryButtonActive,
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    width: 160,
                                    height: 80,
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Container(
                                    margin: EdgeInsets.only(
                                        right: 10.0, bottom: 10.0, top: 5.0),
                                    decoration: BoxDecoration(
                                      color: kPrimaryButtonInactive,
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    width: 160,
                                    height: 80,
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(
                                        right: 10.0, bottom: 10.0, top: 5.0),
                                    decoration: BoxDecoration(
                                      color: kPrimaryButtonInactive,
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    width: 160,
                                    height: 80,
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Container(
                                    margin: EdgeInsets.only(
                                        right: 10.0, bottom: 10.0, top: 5.0),
                                    decoration: BoxDecoration(
                                      color: kPrimaryButtonInactive,
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    width: 160,
                                    height: 80,
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(
                                        right: 10.0, bottom: 10.0, top: 5.0),
                                    width: 160,
                                    height: 80,
                                    decoration: BoxDecoration(
                                      color: kPrimaryButtonInactive,
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                          Container(
                            margin: EdgeInsets.only(bottom: 10.0),
                            child: const Text(
                              'Pièces',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Expanded(
                            child: ListView(
                              scrollDirection: Axis.horizontal,
                              children: [
                                Container(
                                  margin: const EdgeInsets.only(
                                      right: 10.0, top: 10.0, bottom: 40.0),
                                  width: 150,
                                  height: 150,
                                  decoration: BoxDecoration(
                                    color: kPrimaryButtonBlue,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                Container(
                                  margin: const EdgeInsets.only(
                                      right: 10.0, top: 10.0, bottom: 40.0),
                                  width: 150,
                                  decoration: BoxDecoration(
                                    color: kPrimaryButtonBlue,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                Container(
                                  margin: const EdgeInsets.only(
                                      right: 10.0, top: 10.0, bottom: 40.0),
                                  width: 150,
                                  decoration: BoxDecoration(
                                    color: kPrimaryButtonBlue,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                Container(
                                  margin: const EdgeInsets.only(
                                      right: 10.0, top: 10.0, bottom: 40.0),
                                  width: 150,
                                  decoration: BoxDecoration(
                                    color: kPrimaryButtonBlue,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ]),
              ),
            ),
      ],
    ));
  }
}
