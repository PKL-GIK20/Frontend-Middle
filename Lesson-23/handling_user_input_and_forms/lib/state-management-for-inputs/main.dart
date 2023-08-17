import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: Text('Text Field Demo'),
      ),
      body: MyTextField(),
    ),
  ));
}

class MyTextField extends StatefulWidget {
  const MyTextField({Key? key}) : super(key: key);

  @override
  _MyTextFieldState createState() => _MyTextFieldState();
}

class _MyTextFieldState extends State<MyTextField> {
  // Membuat sebuah atribut untuk menyimpan data input
  late String text;

  // Membuat sebuah controller untuk mengontrol nilai dari text field
  final textController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Menginisialisasi atribut text dengan nilai awal controller
    text = textController.text;
    // Menambahkan listener pada controller untuk mendeteksi perubahan teks
    textController.addListener(() {
      // Mengubah nilai atribut text sesuai dengan nilai controller
      setState(() {
        text = textController.text;
      });
    });
  }

  @override
  void dispose() {
    // Membersihkan controller saat tidak digunakan
    textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Membuat sebuah text field dengan menggunakan controller
        TextField(
          controller: textController,
          decoration: InputDecoration(
            labelText: 'Enter some text',
            border: OutlineInputBorder(),
          ),
        ),
        // Membuat sebuah teks yang menampilkan nilai dari atribut text
        Text(
          'You entered: $text',
          style: TextStyle(fontSize: 24.0),
        ),
      ],
    );
  }
}
