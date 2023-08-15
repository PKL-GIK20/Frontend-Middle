import 'package:flutter/material.dart';

// Widget untuk halaman utama
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Transisi Navigasi dan Rute Nama'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Ini adalah halaman utama'),
            ElevatedButton(
              child: Text('Buka halaman kontak'),
              onPressed: () {
                // Berpindah ke halaman kontak dengan rute bernama
                Navigator.pushNamed(context, '/contact');
              },
            ),
          ],
        ),
      ),
    );
  }
}

// Widget untuk halaman kontak
class ContactPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Halaman Kontak'),
      ),
      body: Center(
        child: Text('Ini adalah halaman kontak'),
      ),
    );
  }
}

// Widget untuk halaman kesalahan
class ErrorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Halaman Kesalahan'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error, size: 64, color: Colors.red),
            Text('Rute yang Anda buka tidak valid atau tidak tersedia'),
            ElevatedButton(
              child: Text('Kembali ke halaman utama'),
              onPressed: () {
                // Kembali ke halaman utama dengan Navigator.pop
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    // Menentukan widget untuk halaman utama
    home: HomePage(),
    // Menggunakan parameter onGenerateRoute untuk mengelola rute yang tidak terdaftar
    onGenerateRoute: (settings) {
      // Mengambil nama rute dari settings
      final name = settings.name;
      // Mengambil argumen rute dari settings
      final arguments = settings.arguments;
      // Mengecek nama rute dengan kondisional if-else
      if (name == '/contact') {
        // Mengembalikan objek PageRouteBuilder dengan widget ContactPage
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (context, animation, secondaryAnimation) =>
              ContactPage(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            final tween = Tween(begin: 0.0, end: 1.0);
            final curveTween = CurveTween(curve: Curves.ease);
            final animationValue =
                animation.drive(curveTween).drive(tween); // Ganti nama variabel
            return FadeTransition(
              opacity: animationValue,
              child: child,
            );
          },
        );
      } else {
        // Mengembalikan null jika nama rute tidak dikenali
        return null;
      }
    },
    // Menggunakan parameter onUnknownRoute untuk menangani rute yang tidak dikenali dengan tampilan halaman kesalahan
    onUnknownRoute: (settings) {
      // Mengembalikan objek MaterialPageRoute dengan widget ErrorPage
      return MaterialPageRoute(
        builder: (context) => ErrorPage(),
      );
    },
  ));
}
