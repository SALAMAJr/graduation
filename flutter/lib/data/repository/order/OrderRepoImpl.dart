import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:furniswap/core/errors/failures.dart';
import 'package:furniswap/data/api_services/api_service.dart';
import 'package:furniswap/data/models/order/OrderModel.dart';
import 'package:furniswap/data/models/order/order_response_model.dart';
import 'package:furniswap/data/repository/order/order_repo.dart';
import 'package:hive/hive.dart';

class OrderRepoImpl implements OrderRepo {
  final ApiService apiService;

  OrderRepoImpl(this.apiService);

  @override
  Future<Either<Failure, OrderResponseModel>> createOrder({
    required String offeredProductId,
    required String targetProductId,
    required String paymentMethod,
    String? orderName,
  }) async {
    try {
      final token = await Hive.box('authBox').get('auth_token');
      print("🚀 Creating order...");
      print(
          "🛒 Order Body: offeredProductId: $offeredProductId, targetProductId: $targetProductId, paymentMethod: $paymentMethod");
      print("🔐 Token: $token");

      final response = await apiService.post(
        endPoint: '/order/create',
        data: {
          'name': orderName ?? 'New Order',
          'offeredProductId': offeredProductId,
          'targetProductId': targetProductId,
          'paymentMethod': paymentMethod,
        },
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      print("✅ Order Created Response: $response");

      final orderResponse = OrderResponseModel.fromJson(response);
      return Right(orderResponse);
    } catch (e, stackTrace) {
      return _handleDioException<OrderResponseModel>(e, stackTrace,
          context: 'creation');
    }
  }

  @override
  Future<Either<Failure, List<OrderModel>>> getOrders() async {
    try {
      final token = await Hive.box('authBox').get('auth_token');
      final response = await apiService.get(
        endPoint: '/order/getAll',
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      final List<dynamic> data = response['data'];
      final orders = data.map((json) => OrderModel.fromJson(json)).toList();

      return Right(orders);
    } catch (e, stackTrace) {
      return _handleDioException<List<OrderModel>>(e, stackTrace,
          context: 'fetching orders');
    }
  }

  @override
  Future<Either<Failure, Unit>> deleteOrder(String orderId) async {
    try {
      final token = await Hive.box('authBox').get('auth_token');

      await apiService.delete(
        endPoint: '/order/delete/$orderId',
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      return const Right(unit);
    } catch (e, stackTrace) {
      return _handleDioException<Unit>(e, stackTrace, context: 'delete');
    }
  }

  Either<Failure, T> _handleDioException<T>(
    Object e,
    StackTrace stack, {
    required String context,
  }) {
    if (e is DioException) {
      final responseData = e.response?.data;
      String errorMessage = "Unknown server error";

      if (responseData is Map) {
        errorMessage = responseData['error'] ??
            responseData['details'] ??
            responseData['message'] ??
            "Unknown server error";
      } else if (responseData is String) {
        errorMessage = responseData;
      }

      print("❌ DioException caught during order $context:");
      print("📡 Status Code: ${e.response?.statusCode}");
      print("📨 Response Body: ${e.response?.data}");
      print("📃 Error Message: ${e.message}");
      print("🧨 Extracted Error: $errorMessage");
      print("📌 StackTrace: $stack");

      return Left(ServerFailure(message: errorMessage));
    }

    print("❌ Unknown Error during order $context: $e");
    print("📌 StackTrace: $stack");
    return Left(ServerFailure(message: e.toString()));
  }
}
