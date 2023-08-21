import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'models/product.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Toko Alat Tulis',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: ProductList(),
    );
  }
}

class ProductList extends StatefulWidget {
  @override
  _ProductListState createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  late Future<List<Product>> products;

  @override
  void initState() {
    super.initState();
    products = fetchProducts();
  }

  Future<List<Product>> fetchProducts() async {
    final response =
        await http.get(Uri.parse('https://raw.githubusercontent.com/PKL-GIK20/Frontend-Middle/main/Lesson-24/week_6/product.json'));
    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      return responseData.map((json) => Product.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load products');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Daftar Produk Alat Tulis')),
      body: FutureBuilder<List<Product>>(
        future: products,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                final product = snapshot.data![index];
                final formattedPrice = 'Rp ${product.price.toStringAsFixed(2)}';

              return ListTile(
                title: Text(product.name),
                subtitle: Text('Harga: $formattedPrice'),
            );
            },
            );
          }
        },
      ),
    );
  }
}
