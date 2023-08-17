import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  const MyForm({Key? key}) : super(key: key);

  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  // Membuat sebuah global key yang unik untuk mengidentifikasi form
  final _formKey = GlobalKey<FormState>();

  // Membuat dua buah controller untuk mendapatkan nilai dari text field
  final nameController = TextEditingController();
  final emailController = TextEditingController();

  @override
  void dispose() {
    // Membersihkan controller saat tidak digunakan
    nameController.dispose();
    emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Handling Form Submission'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          // Menghubungkan form dengan global key
          key: _formKey,
          child: Column(
            children: [
              // Membuat text field untuk input nama
              TextFormField(
                // Menghubungkan text field dengan controller
                controller: nameController,
                // Menentukan jenis keyboard yang akan ditampilkan
                keyboardType: TextInputType.name,
                // Menentukan aksi yang akan dilakukan saat menekan tombol "done"
                textInputAction: TextInputAction.next,
                // Menentukan fungsi validasi input
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
                decoration: const InputDecoration(
                  labelText: 'Name',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16.0),
              // Membuat text field untuk input email
              TextFormField(
                // Menghubungkan text field dengan controller
                controller: emailController,
                // Menentukan jenis keyboard yang akan ditampilkan
                keyboardType: TextInputType.emailAddress,
                // Menentukan aksi yang akan dilakukan saat menekan tombol "done"
                textInputAction: TextInputAction.done,
                // Menentukan fungsi validasi input
                validator: (value) {
                  if (value == null || value.isEmpty || !value.contains('@')) {
                    return 'Please enter a valid email';
                  }
                  return null;
                },
                decoration: const InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16.0),
              // Membuat tombol submit dengan fungsi handling form submission
              ElevatedButton(
                onPressed: () {
                  // Memvalidasi input sebelum mengirimkan form
                  if (_formKey.currentState!.validate()) {
                    // Menyembunyikan keyboard
                    FocusScope.of(context).unfocus();
                    // Menampilkan umpan balik bahwa data berhasil disimpan
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Data saved successfully'),
                      ),
                    );
                    // Menyimpan data ke variabel lokal
                    String name = nameController.text;
                    String email = emailController.text;
                    // Mengirim data ke server atau melakukan operasi lain
                    // sesuai dengan tujuan aplikasi
                  }
                },
                child: const Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: MyForm(),
  ));
}
