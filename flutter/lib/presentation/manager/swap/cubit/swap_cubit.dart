import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:furniswap/core/errors/failures.dart';
import 'package:furniswap/data/models/swap/SwapProductModel.dart';
import 'package:furniswap/data/repository/swap/SwapRepo.dart';

part 'swap_state.dart';

class SwapCubit extends Cubit<SwapState> {
  final SwapRepo swapRepo;

  SwapCubit(this.swapRepo) : super(SwapInitial());

  Future<void> fetchSwapProducts() async {
    try {
      emit(SwapLoading());
      final result = await swapRepo.getSwapProducts();
      result.fold(
        (failure) => emit(SwapError(_mapFailureToMessage(failure))),
        (products) => emit(SwapLoaded(products)),
      );
    } catch (e) {
      emit(SwapError("حدث خطأ غير متوقع أثناء جلب المنتجات"));
    }
  }

  String _mapFailureToMessage(Failure failure) {
    if (failure is ServerFailure) return failure.message;
    if (failure is NetworkFailure) return failure.message;
    if (failure is UnknownFailure) return failure.message;
    return "حدث خطأ غير متوقع";
  }
}
