import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  const MyForm({Key? key}) : super(key: key);

  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  // Membuat dua buah focus node untuk masing-masing text field
  late FocusNode nameFocusNode;
  late FocusNode emailFocusNode;

  // Membuat dua buah controller untuk mendapatkan nilai dari text field
  final nameController = TextEditingController();
  final emailController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Menginisialisasi focus node
    nameFocusNode = FocusNode();
    emailFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Membersihkan focus node dan controller saat tidak digunakan
    nameFocusNode.dispose();
    emailFocusNode.dispose();
    nameController.dispose();
    emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Focus and Keyboard Demo'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Membuat text field untuk input nama
            TextFormField(
              // Menghubungkan text field dengan focus node
              focusNode: nameFocusNode,
              // Menghubungkan text field dengan controller
              controller: nameController,
              // Menentukan jenis keyboard yang akan ditampilkan
              keyboardType: TextInputType.name,
              // Menentukan aksi yang akan dilakukan saat menekan tombol "done"
              textInputAction: TextInputAction.next,
              // Menentukan fungsi yang akan dipanggil saat editing selesai
              onEditingComplete: () {
                // Memindahkan fokus ke text field berikutnya
                FocusScope.of(context).requestFocus(emailFocusNode);
              },
              decoration: const InputDecoration(
                labelText: 'Name',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16.0),
            // Membuat text field untuk input email
            TextFormField(
              // Menghubungkan text field dengan focus node
              focusNode: emailFocusNode,
              // Menghubungkan text field dengan controller
              controller: emailController,
              // Menentukan jenis keyboard yang akan ditampilkan
              keyboardType: TextInputType.emailAddress,
              // Menentukan aksi yang akan dilakukan saat menekan tombol "done"
              textInputAction: TextInputAction.done,
              // Menentukan fungsi yang akan dipanggil saat editing selesai
              onEditingComplete: () {
                // Menampilkan data input ke snackbar
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      'Name: ${nameController.text}, Email: ${emailController.text}',
                    ),
                  ),
                );
              },
              decoration: const InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
          ],
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
