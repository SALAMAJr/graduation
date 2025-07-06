import 'package:dartz/dartz.dart';
import 'package:furniswap/core/errors/failures.dart';
import 'package:furniswap/data/models/swap/SwapProductModel.dart';

abstract class SwapRepo {
  Future<Either<Failure, List<SwapProductModel>>> getSwapProducts();
}
