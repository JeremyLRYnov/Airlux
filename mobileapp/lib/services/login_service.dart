import 'dart:convert';
import 'package:http/http.dart' as http;

class LoginService {
  static Future<String> login(String email, String password) async {
    var url = Uri.parse('http://10.0.2.2:6869/user/signin');
    var response = await http
        .post(url, body: {'email': email, 'password': password});
    if (response.statusCode == 200) {
      return jsonDecode(response.body)['token'];
    } else {
      throw Exception('Failed to login.');
    }
  }
}
