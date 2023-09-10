import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

import 'package:mobileapp/screens/home_page.dart';
import 'package:mobileapp/screens/room_page.dart';
import 'package:mobileapp/screens/script_page.dart';
import 'package:mobileapp/screens/settings_page.dart';

class FooterMenu extends StatefulWidget {
  const FooterMenu({super.key});

  @override
  _FooterMenuState createState() => _FooterMenuState();
}

class _FooterMenuState extends State<FooterMenu> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
  TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  final screens = [
    const HomePage(),
    const RoomPage(),
    const ScriptPage(),
    const SettingsPage(),
  ];

  Future<bool> _onBackPressed() {
    if (_selectedIndex != 0) {
      setState(() {
        _selectedIndex = 0;
      });
      return Future.value(false);
    } else {
      return Future.value(true);
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onBackPressed,
      child: Scaffold(
        body: IndexedStack(
          index: _selectedIndex,
          children: screens,
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              backgroundColor: kPrimaryBlue,
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              backgroundColor: kPrimaryBlue,
              icon: Icon(Icons.business),
              label: 'Pièces',
            ),
            BottomNavigationBarItem(
              backgroundColor: kPrimaryBlue,
              icon: Icon(Icons.edit_document),
              label: 'Scenarios',
            ),
            BottomNavigationBarItem(
              backgroundColor: kPrimaryBlue,
              icon: Icon(Icons.settings),
              label: 'Paramètres',
            ),
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.white,
          onTap: _onItemTapped,
        ),
      ),
    );
  }
}