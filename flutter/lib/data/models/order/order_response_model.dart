import 'package:equatable/equatable.dart';

class OrderResponseModel extends Equatable {
  final String status;
  final String message;
  final OrderData data;

  const OrderResponseModel({
    required this.status,
    required this.message,
    required this.data,
  });

  factory OrderResponseModel.fromJson(Map<String, dynamic> json) =>
      OrderResponseModel(
        status: json['status'],
        message: json['message'],
        data: OrderData.fromJson(json['data']),
      );

  @override
  List<Object?> get props => [status, message, data];
}

class OrderData extends Equatable {
  final String id;
  final String status;
  final String paymentMethod;
  final double price;
  final ProductData products;

  const OrderData({
    required this.id,
    required this.status,
    required this.paymentMethod,
    required this.price,
    required this.products,
  });

  factory OrderData.fromJson(Map<String, dynamic> json) => OrderData(
        id: json['id'],
        status: json['status'],
        paymentMethod: json['paymentMethod'],
        price: (json['price'] as num).toDouble(),
        products: ProductData.fromJson(json['products']),
      );

  @override
  List<Object?> get props => [id, status, paymentMethod, price, products];
}

class ProductData extends Equatable {
  final String id;
  final String name;
  final String imageUrl;

  const ProductData({
    required this.id,
    required this.name,
    required this.imageUrl,
  });

  factory ProductData.fromJson(Map<String, dynamic> json) => ProductData(
        id: json['id'],
        name: json['name'],
        imageUrl: json['imageUrl'],
      );

  @override
  List<Object?> get props => [id, name, imageUrl];
}
