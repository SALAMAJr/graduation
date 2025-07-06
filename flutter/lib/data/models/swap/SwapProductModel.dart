import 'package:equatable/equatable.dart';
import 'package:furniswap/data/models/revModel/ReviewResponseModel.dart';

class SwapProductModel extends Equatable {
  final String id;
  final String name;
  final double price;
  final String description;
  final String imageUrl;
  final String type;
  final String condition;
  final String status;
  final String category;
  final String location;
  final String createdAt;
  final String priceType;
  final UserModel? user;

  const SwapProductModel({
    required this.id,
    required this.name,
    required this.price,
    required this.description,
    required this.imageUrl,
    required this.type,
    required this.condition,
    required this.status,
    required this.category,
    required this.location,
    required this.createdAt,
    required this.priceType,
    this.user,
  });

  factory SwapProductModel.fromJson(Map<String, dynamic> json) {
    return SwapProductModel(
      id: json['id'],
      name: json['name'],
      price: (json['price'] as num).toDouble(),
      description: json['description'],
      imageUrl: json['imageUrl'],
      type: json['type'],
      condition: json['condition'],
      status: json['status'],
      category: json['category'],
      location: json['location'],
      createdAt: json['createdAt'],
      priceType: json['priceType'],
      user: json['user'] != null ? UserModel.fromJson(json['user']) : null,
    );
  }

  @override
  List<Object?> get props => [id, name, price, user];
}
