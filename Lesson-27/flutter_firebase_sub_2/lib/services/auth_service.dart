import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';


class AuthService {
  FirebaseAuth firebaseAuth = FirebaseAuth.instance;

  // Register User
  Future<User?> register(String email, String password, BuildContext context) async {
    try {
      UserCredential userCredential = await firebaseAuth.createUserWithEmailAndPassword(email: email, password: password);
      return userCredential.user;
    } on FirebaseAuthException catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message.toString()), backgroundColor: Colors.red));
    } catch (e) {
      print(e);
    }
    return null; // Add this line to fix the return type
  }

  // Login User
  Future<User?> login(String email, String password, BuildContext context) async {
    try {
      UserCredential userCredential = await firebaseAuth.signInWithEmailAndPassword(email: email, password: password);
      return userCredential.user;
    } on FirebaseAuthException catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message.toString()), backgroundColor: Colors.red));
      print(e);
    }
    return null; // Add this line to fix the return type
  }
}
