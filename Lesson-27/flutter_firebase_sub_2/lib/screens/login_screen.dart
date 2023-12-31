import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_firebase_sub_2/services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController emailController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
        centerTitle: true,
        backgroundColor: Colors.teal,
      ),
      body: Padding(padding: EdgeInsets.all(20),
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

          loading? CircularProgressIndicator(): Container(
              height: 50,
              width: MediaQuery.of(context).size.width,
              child: ElevatedButton(
                onPressed: ()async{
                  setState(() {
                    loading = true;
                  });
                  if(emailController.text == "" || passwordController.text == ""){
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          "All fields are required!",
                          style: TextStyle(backgroundColor: Colors.red),
                        ),
                      ),
                    );
                  } else {
                    User? result = await AuthService().login(emailController.text, passwordController.text, context);
                    if (result != null){
                      print("Success");
                      print(result.email);
                    }
                  }
                  setState(() {
                    loading = false;
                  });
                }, 
                
                child: Text("Submit", style: TextStyle(
                  fontSize: 25, fontWeight: FontWeight.bold
                ),),
              ),
            ),
            
        ],
      ),
      ),
      
    );
  }
}