import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Modal Navigation Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Menampilkan halaman modal menggunakan Navigator.push dan PageRouteBuilder
            Navigator.push(
              context,
              PageRouteBuilder(
                opaque: false, // Membuat latar belakang transparan
                pageBuilder: (BuildContext context, _, __) => ModalPage(),
              ),
            );
          },
          child: Text('Open Modal'),
        ),
      ),
    );
  }
}

class ModalPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent, // Mengatur latar belakang transparan
      body: Center(
        child: Container(
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Ini adalah halaman modal',
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context); // Menutup halaman modal
                },
                child: Text('Tutup Modal'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
