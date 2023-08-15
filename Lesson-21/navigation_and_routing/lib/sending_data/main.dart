import 'package:flutter/material.dart';
import './second_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Data Passing Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: FirstPage(),
    );
  }
}

class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            String username = 'John Doe'; // Data yang ingin kita kirimkan
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => SecondPage(username: username), // Mengirim data saat navigasi
              ),
            );
          },
          child: Text('Send Data'),
        ),
      ),
    );
  }
}
