import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: TextButtonExample(),
    );
  }
}

class TextButtonExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('TextButton Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextButton(
              onPressed: () {
                // Aksi yang ingin diambil ketika tombol ditekan
                print('TextButton Pressed');
              },
              style: TextButton.styleFrom(
                textStyle: TextStyle(fontSize: 18),
                primary: Colors.blue, // Warna teks
              ),
              child: Text('Press Me'),
            ),
          ],
        ),
      ),
    );
  }
}
