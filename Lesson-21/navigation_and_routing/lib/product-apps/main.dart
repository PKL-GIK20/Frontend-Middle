import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class Product {
  final String id;
  final String name;
  final double price;

  Product(this.id, this.name, this.price);
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Product Management App',
      initialRoute: '/',
      routes: {
        '/': (context) => ProductListScreen(),
        '/details': (context) => ProductDetailsScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/details') {
          return PageRouteBuilder(
            pageBuilder: (context, animation, secondaryAnimation) =>
                ProductDetailsScreen(),
            transitionsBuilder: (context, animation, secondaryAnimation, child) {
              const begin = Offset(1.0, 0.0);
              const end = Offset.zero;
              const curve = Curves.easeInOut;
              var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
              var offsetAnimation = animation.drive(tween);
              return SlideTransition(position: offsetAnimation, child: child);
            },
          );
        }
        return null;
      },
    );
  }
}

class ProductListScreen extends StatelessWidget {
  final List<Product> products = [
    Product('p1', 'Product 1', 10.99),
    Product('p2', 'Product 2', 19.99),
    Product('p3', 'Product 3', 5.99),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Products')),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (ctx, index) {
          return ListTile(
            title: Text(products[index].name),
            subtitle: Text('\$${products[index].price.toStringAsFixed(2)}'),
            onTap: () {
              Navigator.pushNamed(
                context,
                '/details',
                arguments: products[index],
              );
            },
          );
        },
      ),
    );
  }
}

class ProductDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final product = ModalRoute.of(context)!.settings.arguments as Product;

    return Scaffold(
      appBar: AppBar(title: Text('Product Details')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Product: ${product.name}'),
            Text('Price: \$${product.price.toStringAsFixed(2)}'),
          ],
        ),
      ),
    );
  }
}
