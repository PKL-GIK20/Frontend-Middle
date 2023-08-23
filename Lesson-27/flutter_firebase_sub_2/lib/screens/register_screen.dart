import 'package:flutter/material.dart';
import 'package:flutter_firebase_sub_2/screens/login_screen.dart';

class RegisterScreen extends StatelessWidget {
  
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();

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

            Container(
              height: 50,
              width: MediaQuery.of(context).size.width,
              child: ElevatedButton(
                onPressed: ()async{

                }, 
                child: Text("Submit", style: TextStyle(
                  fontSize: 25, fontWeight: FontWeight.bold
                ),),
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