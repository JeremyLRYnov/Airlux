import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class FooterMenu extends StatefulWidget {
  const FooterMenu({Key? key}) : super(key: key);

  @override
  _FooterMenuState createState() => _FooterMenuState();
}

class _FooterMenuState extends State<FooterMenu> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static const List<Widget> _widgetOptions = <Widget>[
    Text(
      'Index 0: Home',
      style: optionStyle,
    ),
    Text(
      'Index 1: Capteurs',
      style: optionStyle,
    ),
    Text(
      'Index 2: Scenarios',
      style: optionStyle,
    ),
    Text(
      'Index 3: Analytics',
      style: optionStyle,
    ),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          backgroundColor: kPrimaryBlue,
          icon: Icon(Icons.home),
          label: 'Home',

        ),
        BottomNavigationBarItem(
          backgroundColor: kPrimaryBlue,
          icon: Icon(Icons.business),
          label: 'Capteurs',
        ),
        BottomNavigationBarItem(
          backgroundColor: kPrimaryBlue,
          icon: Icon(Icons.school),
          label: 'Scenarios',
        ),
        BottomNavigationBarItem(
          backgroundColor: kPrimaryBlue,
          icon: Icon(Icons.settings),
          label: 'Analytics',
        ),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.white,
      onTap: _onItemTapped,
    );
  }
}
