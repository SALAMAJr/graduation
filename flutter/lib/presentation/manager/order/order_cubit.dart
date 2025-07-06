import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:furniswap/core/errors/failures.dart';
import 'package:furniswap/data/models/order/OrderModel.dart';
import 'package:furniswap/data/models/order/order_response_model.dart';
import 'package:furniswap/data/repository/order/order_repo.dart';

part 'order_state.dart';

class OrderCubit extends Cubit<OrderState> {
  final OrderRepo orderRepo;

  OrderCubit(this.orderRepo) : super(OrderInitial());

  Future<void> createOrder({
    required String offeredProductId,
    required String targetProductId,
    required String paymentMethod,
    String? orderName,
  }) async {
    try {
      emit(OrderLoading());
      final result = await orderRepo.createOrder(
        offeredProductId: offeredProductId,
        targetProductId: targetProductId,
        paymentMethod: paymentMethod,
        orderName: orderName,
      );
      result.fold(
        (failure) => emit(OrderError(_mapFailureToMessage(failure))),
        (orderResponse) => emit(OrderCreated(orderResponse)),
      );
    } catch (e) {
      emit(OrderError("حدث خطأ غير متوقع أثناء إنشاء الطلب"));
    }
  }

  Future<void> getOrders() async {
    try {
      emit(OrderLoading());
      final result = await orderRepo.getOrders();
      result.fold(
        (failure) => emit(OrderError(_mapFailureToMessage(failure))),
        (orders) => emit(OrdersLoaded(orders)),
      );
    } catch (e) {
      emit(OrderError("حدث خطأ غير متوقع أثناء جلب الطلبات"));
    }
  }

  Future<void> deleteOrder(String orderId) async {
    try {
      emit(OrderLoading());
      final result = await orderRepo.deleteOrder(orderId);
      result.fold(
        (failure) => emit(OrderError(_mapFailureToMessage(failure))),
        (_) => getOrders(), // بعد الحذف، نجدد قائمة الطلبات
      );
    } catch (e) {
      emit(OrderError("حدث خطأ غير متوقع أثناء حذف الطلب"));
    }
  }

  String _mapFailureToMessage(Failure failure) {
    if (failure is ServerFailure) return failure.message;
    if (failure is NetworkFailure) return failure.message;
    if (failure is UnknownFailure) return failure.message;
    return "حدث خطأ غير متوقع";
  }
}
