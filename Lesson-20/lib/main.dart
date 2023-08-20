import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    title: 'Navigation Basics',
    home: Less(),
  ));
}

class Less extends StatelessWidget {
  const Less({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stateless Widget'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: Text(
              'Ini adalah contoh StatelessWidget',
              style: TextStyle(fontSize: 20),
            ),
          ),
          const SizedBox(height: 20), // Spasi antara widget
          Center(
            child: ElevatedButton(
              child: const Text('Lanjut ke StatefulWidget'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Full()),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class Full extends StatefulWidget {
  const Full({Key? key}) : super(key: key);

  @override
  _FullState createState() => _FullState();
}

class _FullState extends State<Full> {
  String _inputText = '';

  void _handleTextChanged(String newText) {
    setState(() {
      _inputText = newText;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stateful Widget'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: 300,
            child: TextField(
              onChanged: _handleTextChanged,
              decoration: InputDecoration(
                hintText: 'Masukkan teks...',
                labelText: 'Teks',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ), // Spasi antara widget
          Center(
            child: Text(
              'Teks yang dimasukkan: $_inputText',
              style: TextStyle(fontSize: 20),
            ),
          ),
          const SizedBox(height: 20), // Spasi antara widget
          Center(
            child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Kembali ke StatelessWidget'),
            ),
          ),
        ],
      ),
    );
  }
}
