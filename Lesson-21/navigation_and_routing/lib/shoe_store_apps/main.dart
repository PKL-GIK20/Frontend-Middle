import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class Shoe {
  final String name;
  final String brand;
  final double price;

  Shoe({required this.name, required this.brand, required this.price});
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Shoe Store App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
        '/shoes': (context) => ShoesPage(),
        '/checkout': (context) => CheckoutPage(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Shoe Store'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/shoes');
          },
          child: Text('Browse Shoes'),
        ),
      ),
    );
  }
}

class ShoesPage extends StatelessWidget {
  final List<Shoe> shoes = [
    Shoe(name: 'Running Shoe', brand: 'Nike', price: 120),
    Shoe(name: 'Sneakers', brand: 'Adidas', price: 90),
    Shoe(name: 'Casual Shoe', brand: 'Puma', price: 75),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Browse Shoes'),
      ),
      body: ListView.builder(
        itemCount: shoes.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(shoes[index].name),
            subtitle: Text('${shoes[index].brand} - \$${shoes[index].price.toStringAsFixed(2)}'),
            onTap: () {
              Navigator.pushNamed(context, '/checkout', arguments: shoes[index]);
            },
          );
        },
      ),
    );
  }
}

class CheckoutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Shoe shoe = ModalRoute.of(context)!.settings.arguments as Shoe;

    return Scaffold(
      appBar: AppBar(
        title: Text('Checkout'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'You are purchasing:',
              style: TextStyle(fontSize: 20),
            ),
            SizedBox(height: 10),
            Text(
              '${shoe.name} by ${shoe.brand}',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 10),
            Text(
              'Price: \$${shoe.price.toStringAsFixed(2)}',
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Go Back'),
            ),
          ],
        ),
      ),
    );
  }
}
