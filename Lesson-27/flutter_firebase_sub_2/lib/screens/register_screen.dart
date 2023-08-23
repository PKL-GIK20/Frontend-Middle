import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_firebase_sub_2/screens/login_screen.dart';
import 'package:flutter_firebase_sub_2/services/auth_service.dart';

class RegisterScreen extends StatefulWidget {
  
  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  TextEditingController emailController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  TextEditingController confirmPasswordController = TextEditingController();

  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Register"),
        centerTitle: true,
        backgroundColor: Colors.orange[100],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: "Email",
                border: OutlineInputBorder()
              ),
            ),
            SizedBox(height: 30,),
            TextField(
              controller: passwordController,
              decoration: const InputDecoration(
                labelText: "Password",
                border: OutlineInputBorder()
              ),
            ),
            SizedBox(height: 30,),
            TextField(
              obscureText: true,
              controller: confirmPasswordController,
              decoration: const InputDecoration(
                labelText: "Confirm Password",
                border: OutlineInputBorder()
              ),
            ),
            SizedBox(height: 30,),

            loading? CircularProgressIndicator(): Container(
              height: 50,
              width: MediaQuery.of(context).size.width,
              child: ElevatedButton(
                onPressed: () async {
                  setState(() {
                    loading = true;
                  });
                  if (emailController.text == "" || passwordController.text == "") {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          "All fields are required!",
                          style: TextStyle(backgroundColor: Colors.red),
                        ),
                      ),
                    );
                  } else if (passwordController.text != confirmPasswordController.text) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          "Password doesn't match!",
                          style: TextStyle(backgroundColor: Colors.red),
                        ),
                      ),
                    );
                  } else {
                    User? result = await AuthService().register(
                      emailController.text,
                      passwordController.text,
                      context, // Pass the BuildContext as the third argument
                    );
                    if (result != null) {
                      print("Success");
                      print(result.email);
                    }
                  }
                  setState(() {
                    loading = false;
                  });
                },
                child: Text(
                  "Submit",
                  style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),


            SizedBox(height: 20,),
            TextButton(onPressed: (){
              Navigator.push(context, MaterialPageRoute(builder: (context)=>LoginScreen()));
            }, child: Text("Already have an account? Login here"),)
          ],
        ),
      ),
    );
  }
}