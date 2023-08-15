import 'package:flutter/material.dart';

class SecondPage extends StatelessWidget {
  final String username;

  SecondPage({required this.username}); // Menerima data dari halaman pertama

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Page'),
      ),
      body: Center(
        child: Text('Hello, $username!'), // Menggunakan data yang diterima
      ),
    );
  }
}
