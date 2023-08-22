import 'dart:math';
import 'package:flutter/material.dart';

class MyCardWidget extends StatefulWidget {
  const MyCardWidget({
    Key? key,
  }) : super(key: key);

  @override
  State<MyCardWidget> createState() => _MyCardWidgetState();
}

class _MyCardWidgetState extends State<MyCardWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  Color bgColor = Colors.yellow;
  bool makeCircular = false;
  double _scaleFactor = 0.5;
  double _baseScaleFactor = 0.5;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 5),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onDoubleTap: () {
        setState(() {
          bgColor = Colors.primaries[Random().nextInt(Colors.primaries.length)];
        });
      },
      onLongPress: () {
        setState(() {
          makeCircular = !makeCircular;
        });
      },
      onScaleStart: (details) {
        _baseScaleFactor = _scaleFactor;
      },
      onScaleUpdate: (details) {
        setState(() {
          _scaleFactor = _baseScaleFactor * details.scale;
        });
      },
      onScaleEnd: (details) {
        // Return to the initial scale
        _scaleFactor = _baseScaleFactor;
      },
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Transform.rotate(
            angle:
                _controller.value * 2 * pi, // 1 lap (360 degrees) in 5 seconds
            child: Transform.scale(
              scale: _scaleFactor,
              child: Card(
                shape: makeCircular
                    ? const CircleBorder()
                    : const RoundedRectangleBorder(),
                child: const SizedBox(
                  height: 300,
                  width: 300,
                ),
                color: bgColor,
              ),
            ),
          );
        },
      ),
    );
  }
}
