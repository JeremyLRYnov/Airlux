import 'dart:convert';
import 'package:http/http.dart' as http;

class LoginService {
  static Future<String> login(String username, String password) async {
    var url = Uri.parse('http://localhost:6869/user/signin');
    var response = await http
        .post(url, body: {'username': username, 'password': password});
    if (response.statusCode == 200) {
      return jsonDecode(response.body)['token'];
    } else {
      throw Exception('Failed to login.');
    }
  }
}
