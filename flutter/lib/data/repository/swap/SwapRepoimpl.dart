import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:furniswap/data/models/swap/SwapProductModel.dart';
import 'package:furniswap/data/repository/swap/SwapRepo.dart';
import 'package:hive/hive.dart';
import 'package:furniswap/core/errors/failures.dart';
import 'package:furniswap/data/api_services/api_service.dart';

class SwapRepoImpl implements SwapRepo {
  final ApiService apiService;

  SwapRepoImpl(this.apiService);

  @override
  Future<Either<Failure, List<SwapProductModel>>> getSwapProducts() async {
    try {
      final token = await Hive.box('authBox').get('auth_token');

      print("🚀 Fetching swap products...");
      print("🔐 Token: $token");

      final response = await apiService.get(
        endPoint: '/product/allProductsByType/swap',
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      print("✅ Response received: $response");

      final List<dynamic> data = response['data']['products'];
      final products = data.map((e) => SwapProductModel.fromJson(e)).toList();

      return Right(products);
    } catch (e, stackTrace) {
      return _handleDioException<List<SwapProductModel>>(e, stackTrace,
          context: 'fetching swap products');
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

      print("❌ DioException caught during $context:");
      print("📡 Status Code: ${e.response?.statusCode}");
      print("📨 Response Body: ${e.response?.data}");
      print("📃 Error Message: ${e.message}");
      print("🧨 Extracted Error: $errorMessage");
      print("📌 StackTrace: $stack");

      return Left(ServerFailure(message: errorMessage));
    }

    print("❌ Unknown Error during $context: $e");
    print("📌 StackTrace: $stack");
    return Left(ServerFailure(message: e.toString()));
  }
}
