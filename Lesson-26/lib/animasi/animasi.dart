import 'package:flutter/material.dart';
import 'widget/widgets.dart';

class Animasi extends StatelessWidget {
  const Animasi({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height;
    final width = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: width * 0.1, vertical: height * 0.2),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [MyCardWidget(), MyFavoriteIconWidget()],
        ),
      ),
    );
  }
}
