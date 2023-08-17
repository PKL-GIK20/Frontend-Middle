import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TextEditingController Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'TextEditingController Example'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  // Membuat TextEditingController untuk nama dan email
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  // Membuat variabel untuk menyimpan nilai input
  String _name = '';
  String _email = '';

  // Membuat fungsi untuk menangani perubahan input
  void _handleInput() {
    setState(() {
      // Mengubah nilai variabel sesuai dengan nilai controller
      _name = _nameController.text;
      _email = _emailController.text;
    });
  }

  @override
  void dispose() {
    // Membersihkan controller saat widget tidak digunakan lagi
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // Membuat TextFormField dengan controller untuk nama
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Nama',
                ),
                onChanged: (value) {
                  // Memanggil fungsi saat input berubah
                  _handleInput();
                },
              ),
              // Membuat TextFormField dengan controller untuk email
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(
                  labelText: 'Email',
                ),
                onChanged: (value) {
                  // Memanggil fungsi saat input berubah
                  _handleInput();
                },
              ),
              // Membuat SizedBox untuk memberi jarak antara form dan teks
              const SizedBox(height: 16.0),
              // Membuat Text untuk menampilkan nilai input nama dan email
              Text(
                'Nama Anda adalah $_name dan email Anda adalah $_email.',
                style: Theme.of(context).textTheme.headline6,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
