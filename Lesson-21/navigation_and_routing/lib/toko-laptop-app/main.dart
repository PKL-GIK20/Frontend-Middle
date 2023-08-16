import 'package:flutter/material.dart';

void main() {
  runApp(TokoLaptopApp());
}

class Laptop {
  final String name;
  final int price;

  Laptop(this.name, this.price);
}

class TokoLaptopApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Toko Laptop',
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
        '/detail': (context) => DetailPage(),
        '/checkout': (context) => CheckoutPage(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  final List<Laptop> laptops = [
    Laptop('Laptop A', 1000),
    Laptop('Laptop B', 1500),
    Laptop('Laptop C', 1200),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Toko Laptop')),
      body: ListView.builder(
        itemCount: laptops.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(laptops[index].name),
            subtitle: Text('Price: \$${laptops[index].price}'),
            onTap: () {
              Navigator.pushNamed(
                context,
                '/detail',
                arguments: laptops[index],
              );
            },
          );
        },
      ),
    );
  }
}

class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Laptop laptop = ModalRoute.of(context)!.settings.arguments as Laptop;

    return Scaffold(
      appBar: AppBar(title: Text('Detail Laptop')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Laptop Name: ${laptop.name}'),
            Text('Price: \$${laptop.price}'),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/checkout', arguments: laptop);
              },
              child: Text('Buy Now'),
            ),
          ],
        ),
      ),
    );
  }
}

class CheckoutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Laptop laptop = ModalRoute.of(context)!.settings.arguments as Laptop;

    return Scaffold(
      appBar: AppBar(title: Text('Checkout')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Laptop Name: ${laptop.name}'),
            Text('Price: \$${laptop.price}'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) {
                    return AlertDialog(
                      title: Text('Purchase Successful'),
                      content: Text('Thank you for your purchase!'),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                            Navigator.popUntil(context, ModalRoute.withName('/'));
                          },
                          child: Text('OK'),
                        ),
                      ],
                    );
                  },
                );
              },
              child: Text('Confirm Purchase'),
            ),
          ],
        ),
      ),
    );
  }
}
