import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text(
            'Flutter Elevated Button Icon & Text Example',
          ),
        ),
        body: Center(
          child: ElevatedButton.icon(
          icon: const Icon(
            Icons.favorite,
            color: Colors.pink,
            size: 24.0,
          ),
          label: const Text('Elevated Button'),
          onPressed: () {},
        )));
  }
}