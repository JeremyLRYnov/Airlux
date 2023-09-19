import 'package:flutter/material.dart';
import 'package:mobileapp/models/constants.dart';

class RoomItem extends StatelessWidget {
  final double width;
  final double height;
  final String text;
  final String piece;
  final String roomId;
  final bool isselected;
  final bool isToDelete;
  final VoidCallback onpressed;
  final Function(String)? onDelete;

  const RoomItem({
    super.key,
    required this.width,
    required this.height,
    required this.text,
    required this.piece,
    required this.isselected,
    required this.onpressed,
    required this.roomId,
    this.onDelete,
    required this.isToDelete,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onpressed,
      child: Container(
        margin: const EdgeInsets.only(
          right: 10.0,
          top: 10.0,
        ),
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: isselected ? kPrimaryButtonBlue : kPrimaryButtonInactive,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Stack(
          children: [
            Column(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                  ),
                  child: Image.asset(
                    "assets/images/$piece",
                    width: double.infinity,
                  ),
                ),
                Container(
                  margin: const EdgeInsets.all(15),
                ),
                Text(
                  text,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
            if (isToDelete)
              Positioned(
                top: 5,
                right: 5,
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                  ),
                  child: IconButton(
                    icon: Icon(
                      Icons.delete_outline,
                      color: Colors.white,
                    ),
                    onPressed: () {
                      onDelete!(roomId);
                    },
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

