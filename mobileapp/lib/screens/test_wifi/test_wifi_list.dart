// ignore_for_file: deprecated_member_use, package_api_docs, public_member_api_docs
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobileapp/screens/test_wifi/connect_wifi_sensor.dart';
import 'package:wifi_iot/wifi_iot.dart';
import 'dart:io' show Platform;

const String STA_DEFAULT_SSID = "reseau-jeremy";
const String STA_DEFAULT_PASSWORD = "123456789";
const NetworkSecurity STA_DEFAULT_SECURITY = NetworkSecurity.WPA;

const String AP_DEFAULT_SSID = "AP_SSID";
const String AP_DEFAULT_PASSWORD = "AP_PASSWORD";

void main() => runApp(FlutterWifiIoT());

class FlutterWifiIoT extends StatefulWidget {
  @override
  _FlutterWifiIoTState createState() => _FlutterWifiIoTState();
}

class _FlutterWifiIoTState extends State<FlutterWifiIoT> {
  String? _sPreviousAPSSID = "";
  String? _sPreviousPreSharedKey = "";

  List<WifiNetwork?>? _htResultNetwork;
  Map<String, bool>? _htIsNetworkRegistered = Map();

  bool _isEnabled = false;
  bool _isConnected = false;
  bool _isWifiEnableOpenSettings = false;

  final TextStyle textStyle = TextStyle(color: Colors.white);

  @override
  initState() {
    WiFiForIoTPlugin.isEnabled().then((val) {
      _isEnabled = val;
    });

    WiFiForIoTPlugin.isConnected().then((val) {
      _isConnected = val;
    });

    super.initState();
  }

  storeAndConnect(String psSSID, String psKey) async {
    await storeAPInfos();
    await WiFiForIoTPlugin.setWiFiAPSSID(psSSID);
    await WiFiForIoTPlugin.setWiFiAPPreSharedKey(psKey);
  }

  storeAPInfos() async {
    String? sAPSSID;
    String? sPreSharedKey;

    try {
      sAPSSID = await WiFiForIoTPlugin.getWiFiAPSSID();
    } on PlatformException {
      sAPSSID = "";
    }

    try {
      sPreSharedKey = await WiFiForIoTPlugin.getWiFiAPPreSharedKey();
    } on PlatformException {
      sPreSharedKey = "";
    }

    setState(() {
      _sPreviousAPSSID = sAPSSID;
      _sPreviousPreSharedKey = sPreSharedKey;
    });
  }

  restoreAPInfos() async {
    WiFiForIoTPlugin.setWiFiAPSSID(_sPreviousAPSSID!);
    WiFiForIoTPlugin.setWiFiAPPreSharedKey(_sPreviousPreSharedKey!);
  }

  // [sAPSSID, sPreSharedKey]
  Future<List<String>> getWiFiAPInfos() async {
    String? sAPSSID;
    String? sPreSharedKey;

    try {
      sAPSSID = await WiFiForIoTPlugin.getWiFiAPSSID();
    } on Exception {
      sAPSSID = "";
    }

    try {
      sPreSharedKey = await WiFiForIoTPlugin.getWiFiAPPreSharedKey();
    } on Exception {
      sPreSharedKey = "";
    }

    return [sAPSSID!, sPreSharedKey!];
  }

  Future<WIFI_AP_STATE?> getWiFiAPState() async {
    int? iWiFiState;

    WIFI_AP_STATE? wifiAPState;

    try {
      iWiFiState = await WiFiForIoTPlugin.getWiFiAPState();
    } on Exception {
      iWiFiState = WIFI_AP_STATE.WIFI_AP_STATE_FAILED.index;
    }

    if (iWiFiState == WIFI_AP_STATE.WIFI_AP_STATE_DISABLING.index) {
      wifiAPState = WIFI_AP_STATE.WIFI_AP_STATE_DISABLING;
    } else if (iWiFiState == WIFI_AP_STATE.WIFI_AP_STATE_DISABLED.index) {
      wifiAPState = WIFI_AP_STATE.WIFI_AP_STATE_DISABLED;
    } else if (iWiFiState == WIFI_AP_STATE.WIFI_AP_STATE_ENABLING.index) {
      wifiAPState = WIFI_AP_STATE.WIFI_AP_STATE_ENABLING;
    } else if (iWiFiState == WIFI_AP_STATE.WIFI_AP_STATE_ENABLED.index) {
      wifiAPState = WIFI_AP_STATE.WIFI_AP_STATE_ENABLED;
    } else if (iWiFiState == WIFI_AP_STATE.WIFI_AP_STATE_FAILED.index) {
      wifiAPState = WIFI_AP_STATE.WIFI_AP_STATE_FAILED;
    }

    return wifiAPState!;
  }

  Future<List<APClient>> getClientList(
      bool onlyReachables, int reachableTimeout) async {
    List<APClient> htResultClient;

    try {
      htResultClient = await WiFiForIoTPlugin.getClientList(
          onlyReachables, reachableTimeout);
    } on PlatformException {
      htResultClient = <APClient>[];
    }

    return htResultClient;
  }

  Future<List<WifiNetwork>> loadWifiList() async {
    List<WifiNetwork> htResultNetwork;
    try {
      htResultNetwork = await WiFiForIoTPlugin.loadWifiList();
    } on PlatformException {
      htResultNetwork = <WifiNetwork>[];
    }

    return htResultNetwork;
  }

  isRegisteredWifiNetwork(String ssid) async {
    bool bIsRegistered;

    try {
      bIsRegistered = await WiFiForIoTPlugin.isRegisteredWifiNetwork(ssid);
    } on PlatformException {
      bIsRegistered = false;
    }

    setState(() {
      _htIsNetworkRegistered![ssid] = bIsRegistered;
    });
  }

  Widget getWidgets() {
    WiFiForIoTPlugin.isConnected().then((val) {
      setState(() {
        _isConnected = val;
      });
    });

    // disable scanning for ios as not supported
    if (_isConnected || Platform.isIOS) {
      _htResultNetwork = null;
    }

    if (_htResultNetwork != null && _htResultNetwork!.length > 0) {
      final List<ListTile> htNetworks = <ListTile>[];

      _htResultNetwork!.forEach((oNetwork) {
        final PopupCommand oCmdConnect =
        PopupCommand("Connect", oNetwork!.ssid!);
        final PopupCommand oCmdRemove = PopupCommand("Remove", oNetwork.ssid!);

        final List<PopupMenuItem<PopupCommand>> htPopupMenuItems = [];

        htPopupMenuItems.add(
          PopupMenuItem<PopupCommand>(
            value: oCmdConnect,
            child: const Text('Se connecter'),
          ),
        );

        setState(() {
          isRegisteredWifiNetwork(oNetwork.ssid!);
          if (_htIsNetworkRegistered!.containsKey(oNetwork.ssid) &&
              _htIsNetworkRegistered![oNetwork.ssid]!) {
            htPopupMenuItems.add(
              PopupMenuItem<PopupCommand>(
                value: oCmdRemove,
                child: const Text('Remove'),
              ),
            );
          }

          htNetworks.add(
            ListTile(
              title: Text("" +
                  oNetwork.ssid! +
                  ((_htIsNetworkRegistered!.containsKey(oNetwork.ssid) &&
                      _htIsNetworkRegistered![oNetwork.ssid]!)
                      ? " *"
                      : "")),
              trailing: PopupMenuButton<PopupCommand>(
                padding: EdgeInsets.zero,
                onSelected: (PopupCommand poCommand) {
                  switch (poCommand.command) {
                    case "Connect":
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => FirstRoute()),
                      );
                      /*
                      WiFiForIoTPlugin.connect(STA_DEFAULT_SSID,
                          password: STA_DEFAULT_PASSWORD,
                          joinOnce: true,
                          security: STA_DEFAULT_SECURITY);
                      */
                      break;
                    case "Remove":
                      WiFiForIoTPlugin.removeWifiNetwork(poCommand.argument);
                      break;
                    default:
                      break;
                  }
                },
                itemBuilder: (BuildContext context) => htPopupMenuItems,
              ),
            ),
          );
        });
      });

      return ListView(
        padding: kMaterialListPadding,
        children: htNetworks,
      );
    } else {
      return SingleChildScrollView(
        child: SafeArea(
          child: Column(
            children: Platform.isIOS
                ? getButtonWidgetsForiOS()
                : getButtonWidgetsForAndroid(),
          ),
        ),
      );
    }
  }

  List<Widget> getButtonWidgetsForAndroid() {
    final List<Widget> htPrimaryWidgets = <Widget>[];

    WiFiForIoTPlugin.isEnabled().then((val) {
      setState(() {
        _isEnabled = val;
      });
    });

    if (_isEnabled) {
      htPrimaryWidgets.addAll([
        SizedBox(height: 10),
        Text("Wifi Allumé"),
      ]);

      WiFiForIoTPlugin.isConnected().then((val) {
        setState(() {
          _isConnected = val;
        });
      });

      htPrimaryWidgets.add(Divider(
        height: 32.0,
      ));

      if (_isConnected) {
        htPrimaryWidgets.addAll(<Widget>[
          Text("Connecté au WiFi : "),
          FutureBuilder(
              future: WiFiForIoTPlugin.getSSID(),
              initialData: "Loading..",
              builder: (BuildContext context, AsyncSnapshot<String?> ssid) {
                return Text("SSID: ${ssid.data}");
              }),
          FutureBuilder(
              future: WiFiForIoTPlugin.getBSSID(),
              initialData: "Loading..",
              builder: (BuildContext context, AsyncSnapshot<String?> bssid) {
                return Text("BSSID: ${bssid.data}");
              }),
          FutureBuilder(
              future: WiFiForIoTPlugin.getCurrentSignalStrength(),
              initialData: 0,
              builder: (BuildContext context, AsyncSnapshot<int?> signal) {
                return Text("Signal: ${signal.data}");
              }),
          FutureBuilder(
              future: WiFiForIoTPlugin.getFrequency(),
              initialData: 0,
              builder: (BuildContext context, AsyncSnapshot<int?> freq) {
                return Text("Frequency : ${freq.data}");
              }),
          FutureBuilder(
              future: WiFiForIoTPlugin.getIP(),
              initialData: "Loading..",
              builder: (BuildContext context, AsyncSnapshot<String?> ip) {
                return Text("IP : ${ip.data}");
              }),
        ]);
      } else {
        htPrimaryWidgets.addAll(<Widget>[
          Text("Scan des réseaux Wifi"),
          MaterialButton(
            color: Colors.blue,
            child: Text("Scanner les environs", style: textStyle),
            onPressed: () async {
              _htResultNetwork = await loadWifiList();
              setState(() {});
            },
          ),
        ]);
      }
    } else {
      htPrimaryWidgets.addAll(<Widget>[
        SizedBox(height: 10),
        Text("Wifi Eteint"),
        MaterialButton(
          color: Colors.blue,
          child: Text("Lancer le Wifi", style: textStyle),
          onPressed: () {
            setState(() {
              _isWifiEnableOpenSettings = true;
              WiFiForIoTPlugin.setEnabled(true,
                  shouldOpenSettings: _isWifiEnableOpenSettings);
            });
          },
        ),
      ]);
    }

    htPrimaryWidgets.add(Divider(
      height: 32.0,
    ));

    return htPrimaryWidgets;
  }

  List<Widget> getButtonWidgetsForiOS() {
    final List<Widget> htPrimaryWidgets = <Widget>[];

    WiFiForIoTPlugin.isEnabled().then((val) => setState(() {
      _isEnabled = val;
    }));

    return htPrimaryWidgets;
  }

  @override
  Widget build(BuildContext poContext) {
    return MaterialApp(
      title: Platform.isIOS
          ? "WifiFlutter Example iOS"
          : "WifiFlutter Example Android",
      home: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () => Navigator.pop(context),
          ),
          title: Platform.isIOS
              ? Text('WifiFlutter Example iOS')
              : Text('WifiFlutter Example Android'),
          actions: _isConnected
              ? <Widget>[
            PopupMenuButton<String>(
              onSelected: (value) {
                switch (value) {
                  case "disconnect":
                    WiFiForIoTPlugin.disconnect();
                    break;
                  case "remove":
                    WiFiForIoTPlugin.getSSID().then((val) =>
                        WiFiForIoTPlugin.removeWifiNetwork(val!));
                    break;
                  default:
                    break;
                }
              },
              itemBuilder: (BuildContext context) =>
              <PopupMenuItem<String>>[
                PopupMenuItem<String>(
                  value: "disconnect",
                  child: const Text('Disconnect'),
                ),
                PopupMenuItem<String>(
                  value: "remove",
                  child: const Text('Remove'),
                ),
              ],
            ),
          ]
              : null,
        ),
        body: getWidgets(),
      ),
    );
  }
}

class PopupCommand {
  String command;
  String argument;

  PopupCommand(this.command, this.argument);
}

class FirstRoute extends StatelessWidget {
  FirstRoute({super.key});

  String STA_DEFAULT_SSID = '';
  String STA_DEFAULT_PASSWORD = '';

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        padding: EdgeInsets.all(15.0),
        decoration: BoxDecoration(
          color: Colors.blue.shade900,
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(10.0),
            topLeft: Radius.circular(10.0),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(
              height: 40.0,
            ),
            Text(
              'Ajout du capteur',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 40.0,
            ),
            TextField(
              textAlign: TextAlign.center,
              cursorColor: Colors.black,
              style: TextStyle(color: Colors.black),
              decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.never,
                labelText: 'Nom du capteur',
                labelStyle: TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                hintStyle: TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                filled: true,
                fillColor: Colors.blueGrey[50],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onChanged: (value) {
                STA_DEFAULT_SSID = value;
              },
            ),
            SizedBox(
              height: 30.0,
            ),

            TextField(
              textAlign: TextAlign.center,
              cursorColor: Colors.black,
              style: TextStyle(color: Colors.black),
              decoration: InputDecoration(
                floatingLabelBehavior: FloatingLabelBehavior.never,
                labelText: 'Mot de passe du capteur',
                labelStyle: TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                hintStyle: TextStyle(color: Colors.black, fontSize: 20.0, fontWeight: FontWeight.bold),
                filled: true,
                fillColor: Colors.blueGrey[50],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onChanged: (value) {
                STA_DEFAULT_PASSWORD = value;
              },
            ),
            //Faire une row, faire un container vide sur 50% de la row
            // 50% restant pour le boutton
            MaterialButton(
              child: Text(
                'Se conecter',
                style: TextStyle(
                  color: Colors.black,
                ),
              ),
              color: Colors.blueGrey[50],
              onPressed: () => WiFiForIoTPlugin.connect(STA_DEFAULT_SSID,
                  password: STA_DEFAULT_PASSWORD,
                  joinOnce: true,
                  security: STA_DEFAULT_SECURITY),
            ),
          ],
        ),
      ),
    );
  }
}