import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: KeyboardTypesExample(),
    );
  }
}

class KeyboardTypesExample extends StatefulWidget {
  @override
  _KeyboardTypesExampleState createState() => _KeyboardTypesExampleState();
}

class _KeyboardTypesExampleState extends State<KeyboardTypesExample> {
  TextEditingController _defaultController = TextEditingController();
  TextEditingController _numberController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _urlController = TextEditingController();

  @override
  void dispose() {
    _defaultController.dispose();
    _numberController.dispose();
    _emailController.dispose();
    _urlController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Keyboard Types Example'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextFormField(
              controller: _defaultController,
              decoration: InputDecoration(labelText: 'Default Keyboard'),
            ),
            SizedBox(height: 20),
            TextFormField(
              controller: _numberController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Number Keyboard'),
            ),
            SizedBox(height: 20),
            TextFormField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(labelText: 'Email Keyboard'),
            ),
            SizedBox(height: 20),
            TextFormField(
              controller: _urlController,
              keyboardType: TextInputType.url,
              decoration: InputDecoration(labelText: 'URL Keyboard'),
            ),
          ],
        ),
      ),
    );
  }
}
