import 'package:dartz/dartz.dart';
import 'package:furniswap/core/errors/failures.dart';
import 'package:furniswap/data/models/order/OrderModel.dart';
import 'package:furniswap/data/models/order/order_response_model.dart';

abstract class OrderRepo {
  Future<Either<Failure, OrderResponseModel>> createOrder({
    required String offeredProductId,
    required String targetProductId,
    required String paymentMethod,
    String? orderName,
  });

  Future<Either<Failure, List<OrderModel>>> getOrders();

  Future<Either<Failure, Unit>> deleteOrder(String orderId);
}
