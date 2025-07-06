class ProductModel {
  final String id;
  final String name;
  final int price;
  final String imageUrl;
  final String category;
  // أضف باقي الحقول اللي تحتاجها

  ProductModel({
    required this.id,
    required this.name,
    required this.price,
    required this.imageUrl,
    required this.category,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) => ProductModel(
        id: json['id'],
        name: json['name'],
        price: json['price'],
        imageUrl: json['imageUrl'],
        category: json['category'],
      );
}

class OrderModel {
  final String id;
  final int price;
  final String status;
  final String paymentMethod;
  final String createdAt;
  final ProductModel product;

  OrderModel({
    required this.id,
    required this.price,
    required this.status,
    required this.paymentMethod,
    required this.createdAt,
    required this.product,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) => OrderModel(
        id: json['id'],
        price: json['price'],
        status: json['status'],
        paymentMethod: json['paymentMethod'],
        createdAt: json['createdAt'],
        product: ProductModel.fromJson(json['products']),
      );
}
